import React, { useState } from "react";
import { CRUDService, LOGIN } from "../Services/axiosService";
import { Link, useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useDispatch } from 'react-redux';
import { login } from "../../reducers/authSlice.js";

const SignIn = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: formData.email,
      password: formData.password,
    };
    
    const params = {
      headers: { "Content-Type": "application/json"},
      data: data,
    };

    CRUDService.post(params, LOGIN).then((res) => {
      let token = res.data.access_token
      localStorage.setItem("token",token);
      if(res.status === HttpStatusCode.Ok){
        const information = {
          access_token:res.data.access_token          ,
          expires_in: res.data.expires_in,
          token_type: res.data.token_type,
          username: res.data.username
        }

        dispatch(login( information ))
        navigate('VarxenPerformance/Session')
      }
    });
  };

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="absolute bg-gradient-to-b from-varxen-primaryPurple to-varxen-secundaryPurple opacity-70 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" alt="" />
              <h1 className="mb-3 font-bold text-5xl">
                Performance testing for experts and non-experts
              </h1>
              <p className="pr-3">
                Leave trial and error behind. With Varxen Performance, you
                specify relevant parameters from your session records and modify
                as you wish.
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
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
                <h3 className="font-semibold text-2xl text-gray-800 dark:text-white">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500 dark:text-white">
                  Please sign in to your account.
                </p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    Email
                  </label>
                  <input
                    className=" w-full bg-white text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-varxen-primaryPurple dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-secundaryPurple"
                    type="mail"
                    name="email"
                    id="email"
                    placeholder="email@example.com"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide dark:text-white">
                    Password
                  </label>
                  <input
                    className="w-full bg-white content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-varxen-primaryPurple dark:bg-white dark:text-neutral-600 dark:placeholder-neutral-300 dark:border-white dark:focus:border-varxen-secundaryPurple"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800 dark:text-white"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#Temporal"
                      className="text-varxen-primaryPurple hover:text-varxen-secundaryPurple"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-varxen-primaryPurple hover:bg-varxen-secundaryPurple text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                  <div className="text-sm text-center mt-5">
                    <Link
                      to="/SignUp"
                      className="text-varxen-primaryPurple hover:text-varxen-secundaryPurple"
                    >
                      Dont have an account? Sign Up
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021-2022
                  {/* <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" className="text-green hover:text-green-500">AJI</a>*/}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
