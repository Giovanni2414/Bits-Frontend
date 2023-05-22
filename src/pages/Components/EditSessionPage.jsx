import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CRUDService, SESSIONS, BLOBS } from "../Services/axiosService";
import CardRequest from "./pure/CardRequest";

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

  let cardsRequest = () =>
    harFile.log.entries.map((item) => {

      return (
        <CardRequest item={item}></CardRequest>
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
        <div></div>
      )}
    </>
  );
};

export default EditSessionPage;
