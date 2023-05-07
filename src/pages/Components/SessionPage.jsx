import React, { useEffect, useState } from "react";
import { CRUDService, SESSIONS } from "../Services/axiosService";
import {
  MdDeleteForever,
  MdModeEdit,
  MdOutlineWarningAmber,
} from "react-icons/md";

function Session() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    const handlerSessions = async () => {
      const answer = await CRUDService.getAll(SESSIONS);
      setSession(answer);
    };
    handlerSessions().catch(console.error);
  }, []);

  var count = 0;
  let tb_data = session.map((item) => {
    count += 1;
    return (
      <tr key={item.sessionId}>
        <td>{count}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{item.name}</div>
            </div>
          </div>
        </td>
        <td>{item.creationDate}</td>
        <td>
          <button>
            <MdDeleteForever fill="#FF0000" size={24} />
          </button>
          <button className="ml-4">
            <MdModeEdit fill="#8b8d90" size={24} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="m-3 flex-row">
        <input
          type="text"
          placeholder="Search session"
          className="input input-bordered w-11/12 rounded-3xl mr-3"
        />
        <button className="btn rounded-3xl">Search</button>
      </div>
      <div className="overflow-x-auto w-full p-3">
        {session.length !== 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{tb_data}</tbody>
          </table>
        ) : (
          <div>
            <div className="alert alert-warning shadow-lg ">
              <div>
                <MdOutlineWarningAmber size={24}/>
                <span>You dont have any recorded session</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Session;
