import React, { useEffect, useState } from "react";

function Session() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    //TODO peticion to back
  });

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
                <button className="btn btn-ghost btn-xs">Edit</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs">Configure</button>
              </th>
            </tr>
            {tb_data}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
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
