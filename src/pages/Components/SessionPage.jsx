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
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                  </div>
                </div>
              </td>
              <td>dd/mm/aa</td>
              <th>
                <button className="btn btn btn-xs bg-varxen-primaryPurple border-0 hover:bg-varxen-secundaryPurple text-varxen-secundaryWhite">Edit</button>
              </th>
              <th>
                <button className="btn btn btn-xs bg-varxen-primaryPurple border-0 hover:bg-varxen-secundaryPurple text-varxen-secundaryWhite">Configure</button>
              </th>
            </tr>
            {tb_data}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Session;
