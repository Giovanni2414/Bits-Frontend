import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CRUDService, SESSIONS, BLOBS } from "../Services/axiosService";

const EditSessionPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [harFile, setHarFile] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const sessionRequest = await CRUDService.getOne(SESSIONS, sessionId);
      setSession(sessionRequest);

      const harFileRequest = await CRUDService.getOne(
        BLOBS,
        sessionRequest.harFilePath
      );
      setHarFile(harFileRequest);
    };

    getSession().catch(console.error);
  }, []);

  let paramsRequest = (queryString) =>
    queryString.map((item) => {
      return (
        <div className="flex flex-row mb-2">
          <div className="mr-3">{item.name}: </div>
          <input
            type="text"
            placeholder="Type here"
            className="input w-full input-xs text-black"
          />
        </div>
      );
    });

  let cardsRequest = () =>
    harFile.log.entries.map((item) => {
      let domain = item.request.url;
      const regex = /^(?:https?:\/\/)?([^/?#]+)/i;
      domain = domain.match(regex)[1].replace("www.", "");
      return (
        <div className="card bg-varxen-primaryPurple text-white">
          <div className="card-body">
            <h2 className="card-title">{domain}</h2>
            <p>
              <b>Method: </b>
              {item.request.method}
            </p>
            <div className="divider before:bg-white after:bg-white  "></div>
            <div className="h-32 overflow-y-auto">
              <div className="mb-2">PARAMS</div>
              {paramsRequest(item.request.queryString)}
            </div>
            <div className="card-actions">
              <button className="btn bg-varxen-secundaryGray">Delete Request</button>
              <button className="btn bg-varxen-secundaryGray">Save Values</button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      {session ? (
        <div className="m-5">
          <div className="text-5xl">{session.name}</div>
          <div className="text-sm">{session.creationDate}</div>
          <div className="divider"></div>
          <div className="grid grid-cols-3 gap-10 justify-stretch">
            {harFile ? cardsRequest() : <></>}
          </div>
        </div>
      ) : (
        <div>hpta</div>
      )}
    </>
  );
};

export default EditSessionPage;
