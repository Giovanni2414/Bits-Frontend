import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CRUDService, REGISTER } from "../Services/axiosService";
import { HttpStatusCode } from "axios";
import Swal from 'sweetalert2'

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    organizationName: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const params = {
      data: formData,
    };

    CRUDService.post(params, REGISTER).then((res) => {
      //TODO CHANGE RESPONSE FROM BACK TO 201
      if (res.status === HttpStatusCode.Ok) {
        Swal.fire({
          title: 'User Created',
          text: 'Congratulations, you have new user',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(navigate("/"))
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-varxen-100">
      <div className="flex justify-center self-center  z-10 shadow-md rounded-xl">
        <form
          className="p-12 bg-white mx-auto rounded-2xl w-100 dark:bg-neutral-800"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <div className="flex justify-center mb-5">
              <img
                src="./images/logo-varxen-vector.svg"
                alt="imagen varxen"
                className="w-[200px] dark:hidden"
              ></img>
              <img
                src="./images/logo-varxen-vector-dark.svg"
                alt="imagen varxen"
                className="w-[200px] hidden dark:block"
              ></img>
            </div>
            <div>
              <h3 className="font-semibold text-2xl text-gray-800 dark:text-white text-center">
                Sign Up
              </h3>
              <p className="text-gray-500 dark:text-white text-center">
                Please enter your information.
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex flex-row">
              <div className="flex flex-col m-3 basis-1/2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    Email
                  </label>
                  <input
                    className=" w-full bg-white text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100 dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-200"
                    type="mail"
                    name="email"
                    id="email"
                    placeholder="email@example.com"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 mt-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    First Name
                  </label>
                  <input
                    className=" w-full bg-white text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100 dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-200"
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter your firstname"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 mt-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    Organization Name
                  </label>
                  <input
                    className=" w-full bg-white text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100 dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-200"
                    type="text"
                    name="organizationName"
                    id="organizationName"
                    placeholder="Enter the name of your organization"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col m-3 basis-1/2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    Username
                  </label>
                  <input
                    className=" w-full bg-white text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100 dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-200"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 mt-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    Last Name
                  </label>
                  <input
                    className=" w-full bg-white text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100 dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-200"
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter your lastname"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 mt-1">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    Password
                  </label>
                  <input
                    className="w-full bg-white content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100 dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-200"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-varxen-100 hover:bg-varxen-200 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Sign up
              </button>
              <div className="flex justify-center items-center mt-4">
                <Link to="/" className="text-varxen-100 hover:text-varxen-200">
                  Already have an account? Sign In
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
