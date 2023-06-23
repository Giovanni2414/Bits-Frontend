import React, {useEffect, useState} from "react";
import {CRUDService, SESSIONS, SESSIONS_NAME} from "../Services/axiosService";
import {
    MdDeleteForever,
    MdModeEdit,
    MdOutlineWarningAmber,
} from "react-icons/md";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {MdArrowCircleDown} from "react-icons/md";

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
        const {value} = event.target;
        setSearch(value);
        if (value === "") {
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

    const orderByName = () => {
        var sessionToOrder = JSON.parse(JSON.stringify(session))
        sessionToOrder.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // Convertir a mayúsculas para comparación
            var nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1; // a debe ser ordenado antes que b
            }
            if (nameA > nameB) {
                return 1; // a debe ser ordenado después que b
            }
            return 0; // a y b son iguales en cuanto a orden
        });
        setSession(sessionToOrder)
    }

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
                    <button onClick={() => deleteSession(item.sessionId)}>
                        <MdDeleteForever fill="#FF0000" size={24}/>
                    </button>
                    <Link to={`/VarxenPerformance/EditSession/${item.sessionId}`}>
                        <button className="ml-4">
                            <MdModeEdit fill="#8b8d90" size={24}/>
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
                            <th onClick={orderByName} className="cursor-pointer">Name</th>
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
