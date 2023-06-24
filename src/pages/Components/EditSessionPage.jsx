import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CRUDService, SESSIONS, BLOBS } from "../Services/axiosService";
import CardRequest from "./pure/CardRequest";
import { MdOutlineSaveAs } from "react-icons/md";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const EditSessionPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [harFile, setHarFile] = useState(null);
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.value);

  useEffect(() => {
    const getSession = async () => {
      const sessionRequest = await CRUDService.getOne(SESSIONS, sessionId);
      setSession(sessionRequest);

      const harFileRequest = await CRUDService.getOne(
        BLOBS,
        sessionRequest.harFilePath
      );
      setHarFile(harFileRequest);
      setEntries(JSON.parse(JSON.stringify(harFileRequest.log.entries)));
    };

    getSession().catch(console.error);
  }, [sessionId]);

  const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const handlerSave = () => {
    if (compareArrays(harFile.log.entries, entries)) {
      Swal.fire({
        title: "No change in your session",
        confirmButtonColor: "#574ff6",
      });
    } else {
      Swal.fire({
        title: "Submit the session name",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Save New Session",
        confirmButtonColor: "#574ff6",
        showLoaderOnConfirm: true,
        preConfirm: (sessionName) => {
          var finalHar = JSON.parse(JSON.stringify(harFile));
          finalHar.log.entries = JSON.parse(JSON.stringify(entries));

          var file = new Blob([JSON.stringify(finalHar)], {
            type: "multipart/form-data",
          });

          var renamedFile = new File([file], "file.har", { type: "application/har" });

          var formdata = new FormData();
          formdata.append("file", renamedFile);

          const paramsBlob = {
            headers: CRUDService.getHeaderConfig(),
            data: formdata,
          };

          paramsBlob.headers["Content-Type"] = "multipart/form-data";

          return CRUDService.post(paramsBlob, BLOBS)
            .then((response) => {
              var information = {
                name: sessionName,
                harFilePath: response.data,
                username: user.username
              };

              const paramsSession = {
                headers: CRUDService.getHeaderConfig(),
                data: information,
              };
              return CRUDService.post(paramsSession, SESSIONS).then(
                (sessionResponse) => {
                  return sessionResponse
                }
              );
            })
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.value.status === 200) {
          Swal.fire({
            title: `The new session was saved as ${result.value.data.name}`
          }).then((result)=> {
            if(result.isConfirmed){
              navigate('/VarxenPerformance/Session')
            }
          });
        }else{
          Swal.fire({
            title: `${result?.value?.data?.message}`
          })
        }
      });
    }
  };

  const deleteEntry = (entryID) => {
    var copyEntries = entries;
    copyEntries = copyEntries.filter((element) => element._id !== entryID);
    setEntries(copyEntries);
  };

  const changeParamsHandler = (params, entryId) => {
    var copyEntries = entries;
    copyEntries = copyEntries.map((element) => {
      if (element._id === entryId) {
        element.request.queryString = params;
      }
      return element;
    });
    setEntries(copyEntries);
  };

  const cardsRequest = () =>
    entries.map((item) => {
      return (
        <CardRequest
          item={item}
          deleteHandler={deleteEntry}
          changeParamsHandler={changeParamsHandler}
          key={item._id}
        ></CardRequest>
      );
    });

  return (
    <>
      {session ? (
        <div className="m-5 container mx-auto">
          <div className="flex justify-between">
            <div>
              <div className="text-5xl">{session.name}</div>
              <div className="text-sm">{session.creationDate}</div>
            </div>
            <div className="grid content-center">
              <button
                className="btn bg-varxen-primaryPurple hover:bg-varxen-secundaryPurple rounded-3xl"
                onClick={handlerSave}
              >
                SAVE <MdOutlineSaveAs className="ml-2" size={22} />
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-3 gap-10 justify-stretch">
            {harFile ? cardsRequest() : <></>}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EditSessionPage;
