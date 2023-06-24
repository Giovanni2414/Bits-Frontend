import React, {useEffect, useState} from "react";
import {CRUDService, SESSIONS, SESSIONS_NAME, SESSIONS_USER} from "../Services/axiosService";
import {MdDeleteForever, MdModeEdit, MdOutlineWarningAmber,} from "react-icons/md";
import Swal from "sweetalert2";
import {createSearchParams, Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


function Session() {
    const [session, setSession] = useState([]);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.value);
    const [selectedOption, setSelectedOption] = useState("LOCUST");
    const [weightValue, setWeightValue] = useState("");


    useEffect(() => {
        const handlerSessions = async () => {
            const answer = await CRUDService.getOne(SESSIONS_USER, user.username);
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

    //Sends the info of the pop-up
    const createTest = (sessionId) => {
        setShowModal(false);
        console.log(selectedOption, " - ", weightValue);
        if (selectedOption === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must select a framework'
            })
            setSelectedOption('LOCUST');
            return;
        }
        if (weightValue < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Value must be equal or higher than one'
            })
            setWeightValue("");
            return;
        }

        navigate({
            pathname: "PerformanceTest",
            search: createSearchParams({
                testingFrameworkPlatform: selectedOption,
                weight: weightValue,
                sessionId: sessionId
            }).toString()
        })

    };

    //Cleans the fields on the pop-up when close button is clicked
    const onClose = () => {
        setShowModal(false);
        setSelectedOption('LOCUST');
        setWeightValue("");
    }

    //constants to show the pop-up
    const [showModal, setShowModal] = React.useState(false);


    const deleteSession = async (sessionId) => {
        Swal.fire({
            title: "Do you want to delete the session?",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                CRUDService.delete(SESSIONS, sessionId).then(async () => {
                    const listSessions = await CRUDService.getOne(SESSIONS_USER, user.username);
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
                    <label htmlFor="my_modal_6" className="btn rounded-3xl bg-varxen-primaryPurple  mx-2 border-0">Performance test</label>
                    <input type="checkbox" id="my_modal_6" className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box mx-4">
                            <h3 className="font-bold text-3xl">Test Configuration!</h3>
                            <p className="my-3 text-lg">Please enter you configuration</p>
                            <div className="divider"></div>
                            <div className="grid grid-cols-1 items-center">
                                <div className="flex flex-row items-center">
                                    <label>Weight</label>
                                    <input type="text" placeholder="Enter the test weight"
                                           className="input input-bordered input-primary w-full ml-4"
                                           onChange={(e) => setWeightValue(e.target.value)}/>
                                </div>
                                <select className="select select-primary w-full mt-4"
                                        onChange={(e) => setSelectedOption(e.target.value)}>
                                    <option disabled selected>Testing Framework</option>
                                    <option>Locust</option>
                                </select>
                            </div>
                            <div className="modal-action">
                                <label htmlFor="my_modal_6"
                                       className="btn bg-varxen-primaryPurple border-0 rounded-3xl px-6 hover:bg-varxen-secundaryPurple">Close!</label>
                                <button
                                    className={"btn bg-varxen-primaryPurple border-0 rounded-3xl hover:bg-varxen-secundaryPurple"}
                                    onClick={() => createTest(item.sessionId)}>Make Performance Test
                                </button>
                            </div>
                        </div>
                    </div>
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
