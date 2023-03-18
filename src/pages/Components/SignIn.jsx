import React, {useState} from 'react'

const SignIn = () => {

    const [formData, setFormData] = useState({
        usename: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        
        console.log("entra")
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        
        console.log(data.get('email'))
        console.log(data.get('password'))
    }

    const test = (event) => {
        event.preventDefault();
        console.log("entra")
        
    }

    return (
        <div>
            <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: "url(https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}><div className="absolute bg-gradient-to-b from-varxen-100 to-varxen-200 opacity-70 inset-0 z-0"></div>
                <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                        <div className="self-start hidden lg:flex flex-col  text-white">
                            <img src="" className="mb-3" alt="" />
                            <h1 className="mb-3 font-bold text-5xl">Performance testing for experts and non-experts</h1>
                            <p className="pr-3">Leave trial and error behind. With Varxen
                                Performance, you specify relevant parameters
                                from your session records and modify as you wish.</p>
                        </div>
                    </div>
                    <div className="flex justify-center self-center  z-10">
                        <form className="p-12 bg-white mx-auto rounded-2xl w-100" onSubmit={test}>
                            <div className="mb-4">
                                <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
                                <p className="text-gray-500">Please sign in to your account.</p>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                    <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100" type="mail" placeholder="mail@gmail.com" name='email'/>
                                </div>
                                <div className="space-y-2">
                                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">Password</label>
                                    <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-varxen-100" type="password" placeholder="Enter your password" id='password' />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#Temporal" className="text-varxen-100 hover:text-varxen-200">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center bg-varxen-100 hover:bg-varxen-200 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Sign in
                                    </button>
                                </div>
                            </div>
                            <div className="pt-5 text-center text-gray-400 text-xs">
                                <span>
                                    Copyright © 2021-2022
                                    {/* <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" className="text-green hover:text-green-500">AJI</a>*/}</span> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
