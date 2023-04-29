import React, { useEffect, useState } from "react";
import { CRUDService, SESSIONS } from "../Services/axiosService";

function Session() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    const handlerSessions = async () => {
      const answer = await CRUDService.getAll(SESSIONS);
      setSession(answer)
      console.log(answer)
    }
    handlerSessions().catch(console.error)
  }, []);
  
  

  let tb_data = session.map((item) => {
    return (
      <tr key={item.sessionId}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{item.name}</div>
            </div>
          </div>
        </td>
        <td>{item.creationDate}</td>
        <th>
          <button className="btn btn-ghost btn-xs">Edit</button>
        </th>
        <th>
          <button className="btn btn-ghost btn-xs">Configure</button>
        </th>
      </tr>
    );
  });

  return (
    <div>
      <div className="m-3 flex-row" >
        <input type="text" placeholder="Search session" className="input input-bordered w-11/12 rounded-3xl mr-3" />
        <button className="btn rounded-3xl">Buscar</button>
      </div>
      <div className="overflow-x-auto w-full p-3">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                  </div>
                </div>
              </td>
              <td>dd/mm/aa</td>
              <th>
                <button className="btn btn-error btn-xs ">Eliminar</button>
              </th>
            </tr>
            {tb_data}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Session;
