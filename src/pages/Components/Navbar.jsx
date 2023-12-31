import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from "../../reducers/authSlice";

function Navbar() {
  const dispatch = useDispatch()

  const logoutAction = () => {
    dispatch(logout())
  }

  return (
      <nav className="bg-varxen-primaryPurple border-gray-200 dark:bg-varxen-secondaryPurple">
          <div className="container flex flex-wrap items-center justify-between mx-auto py-4">
            <a href="https://www.varxen.com/" className="flex items-center bg-white dark:bg-varxen-primaryBlack rounded-2xl p-2">
              <img
                src="../images/logo-varxenB-vector-only.svg"
                className="h-8 w-12 mr-3"
                alt="Varxen Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mr-1">
                Varxen Performance
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                <li className="bg-varxen-primaryPurple">
                  <Link
                    to="/VarxenPerformance/Session"
                    className="block py-2 pl-3 pr-4 text-varxen-secundaryWhite rounded md:bg-transparent md:p-0 dark:text-varxen-secundaryWhite dark:hover:text-varxen-primaryBlack"
                    aria-current="page"
                  >
                    Sessions
                  </Link>
                </li>
                <li className="bg-varxen-primaryPurple">
                  <button
                    onClick={logoutAction}
                    className="block py-2 pl-3 pr-4 text-varxen-secundaryWhite rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:text-varxen-primaryBlack"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  )
}

export default Navbar
