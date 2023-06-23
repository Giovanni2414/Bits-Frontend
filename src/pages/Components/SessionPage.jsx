import React, { useEffect, useState } from "react";
import { CRUDService, SESSIONS, SESSIONS_NAME } from "../Services/axiosService";
import {
  MdDeleteForever,
  MdModeEdit,
  MdOutlineWarningAmber,
} from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Session() {
  const [session, setSession] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handlerSessions = async () => {
      const answer = await CRUDService.getAll(SESSIONS);
      setSession(answer);
    };
    handlerSessions().catch(console.error);
  }, [isSearching]);

  const saveSearchValue = (event) => {
    const { value } = event.target;
    setSearch(value);
    if(value===""){
      setIsSearching(!isSearching)
    }
  };

  const deleteSession = async (sessionId) => {
    Swal.fire({
      title: "Do you want to delete the session?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        CRUDService.delete(SESSIONS, sessionId).then(async () => {
          const listSessions = await CRUDService.getAll(SESSIONS);
          setSession(listSessions);
        });
        Swal.fire("Deleted!", "", "success");
      }
    });
  };


  const [showModal, setShowModal] = React.useState(false);


  const getSession = async (event) => {
    event.preventDefault();

    if (search !== "") {
      const answer = await CRUDService.getOne(SESSIONS_NAME, search);
      if (answer.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The name entered does not exist!",
        });
      } else {
        setSession(answer);
      }
    } else {
      Swal.fire(
        "Do you want to search?",
        "You must enter a session name to be able to search for it.",
        "question"
      );
    }
  };

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


          <button
              className="flex justify-center bg-varxen-primaryPurple hover:bg-varxen-secundaryPurple text-gray-100 px-6 py-2 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"                                type="button"
              onClick={() => setShowModal(true)}
          >
            Test
          </button>
          {showModal ? (
              <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="font-semibold text-2xl text-gray-800 dark:text-white">
                          Configuration
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                        </button>
                      </div>
                      {/*body*/}

                      <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                          <div className="popup-form">
                            <div className="form-group">
                              <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                                Enter weight:
                              </label>
                              <input
                                  className=" w-full bg-white text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-varxen-primaryPurple dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-secundaryPurple"
                                  type="text"
                                  name="weight"
                                  id="weight"
                                  placeholder="Enter a value equal or higher than one"
                              />
                            </div>
                            <div className="form-group">
                              <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                                Select testing framework:
                              </label>
                              <select>

                                <option className="text-sm tracking-wide dark:text-white" value="locust">Locust</option>
                                <option className="text-sm tracking-wide dark:text-white" value="opt2">Option 2</option>
                                <option className="text-sm tracking-wide dark:text-white" value="opt3">Option 3</option>
                              </select>
                            </div>
                          </div>
                        </p>
                      </div>


                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-primaryBlack background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                            className="bg-varxen-primaryPurple text-gray-100 font-semibold uppercase px-6 py-3 rounded-full shadow-lg bg-varxen-secundaryPurple mr-1 mb-1 ease-linear transition ease-in duration-500"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                          TEST
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
          ) : null}


          <button onClick={() => deleteSession(item.sessionId)}>
            <MdDeleteForever fill="#FF0000" size={24} />
          </button>
          <Link to={`/VarxenPerformance/EditSession/${item.sessionId}`}>
            <button className="ml-4">
              <MdModeEdit fill="#8b8d90" size={24} />
            </button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="m-3 flex-row">
        <form onSubmit={getSession}>
          <input
            type="text"
            placeholder="Search session"
            className="input input-bordered w-11/12 rounded-3xl mr-3"
            name="searchInput"
            onChange={saveSearchValue}
          />
          <button type="submit" className="btn rounded-3xl">
            Search
          </button>
        </form>
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
                <MdOutlineWarningAmber size={24} />
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
