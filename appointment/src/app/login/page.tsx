/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, ArrowLeftIcon, ArrowRightIcon, StethoscopeIcon, UserIcon, ShieldIcon,
    MailIcon, LockIcon
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login () {

    const [isDoctor, setIsDoctor] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const router = useRouter();

    const handleLogin = async () => {

        const res = await fetch(`http://localhost:5000/api/auth/${!isDoctor? `user` : `doc`}/login`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })

        

        if (res.ok) {
            const { id } = await res.json();

            router.push(`/${!isDoctor ? `patient` : `doctor`}/${id}/dashboard`)
        }
        else {
            console.error("Failed to get the data");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center
        justify-center p-4" style={{fontFamily: "var(--font-poppins)"}}>
            <div className="container max-w-md">
                <div className="text-center mb-8">

                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <img
                        src="/Logo.svg"
                        alt="logo"
                        className="w-20 h-auto"/>
                    </div>

                    <a href="/home" className="inline-flex items-center text-slate-600
                    hover:text-teal-600 transition-colors mb-6">
                        <ArrowLeftIcon className="w-4 h-4 mr-2"/>
                        Back to Home
                    </a>
                    
                    <h1 className="text-center text-slate-900 text-2xl font-bold mb-2">Welcome Back</h1>
                    <p className=" text-center text-slate-600">Sign in to your account to continue</p>
                </div>
                <div className="flex flex-col justify-center items-center bg-slate-50 pt-20 pb-8 px-8 rounded-lg
                 shadow-md shadow-slate-300 space-y-4 shadow-xl shadow-slate-300 border-t border-slate-300">
                    <div className="relative w-full bg-slate-200 rounded-lg border-4 border-slate-200">
                        <div className="relative flex justify-center w-full z-10">
                            <button 
                                onClick={
                                    () => {
                                        setIsDoctor(false);
                                    }
                                }
                                className={`inline-flex gap-3 justify-center text-slate-900 px-4 
                                     py-2 rounded-l-lg w-full
                                    bg-transparent`}>
                                        <UserIcon/>
                                    Patient
                            </button>
                                    
                            <button
                                onClick={
                                    () => {
                                        setIsDoctor(true);
                                    }
                                }
                                className={`inline-flex gap-3 justify-center text-slate-900 px-4
                                     py-2 rounded-r-lg w-full z-10
                                    bg-transparent`}>
                                        <StethoscopeIcon/>
                                        Doctor
                            </button>
                        </div>

                        <div className={`absolute inset-0 bg-slate-50 rounded-lg w-[50%]
                             transition-transform duration-500 ${!isDoctor ? `translate-x-0` : `translate-x-[100%]`}`}>    
                        </div>
                    </div>
                    {!isDoctor && (<div className="flex flex-col w-full justify-center items-center space-y-4">
                        <div className="inline-flex items-center justify-center gap-1 text-blue-500 mt-4 text-xs
                        border rounded-full w-fit px-2 bg-blue-300/30">
                            <UserIcon className="w-4"/>
                            Patient Portal
                        </div>

                        

                        <div className="container space-y-2 w-full">
                            <div>
                                <label className="text-slate-900 font-semibold">Email Address</label>
                            </div>
                            <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                <MailIcon className="text-slate-400"/>
                                <input
                                onChange={
                                    (event) => {
                                        setEmail(event.target.value);
                                    }
                                }
                                onBlur={() => {
                                    
                                    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[a-zA-z]{3,7}$/.test(email)) setEmailError("");
                                    else setEmailError("invalid");
                                }}
                                type="text"
                                placeholder="example@email.com"
                                className="rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                            {
                                emailError && (
                                    <p className="text-sm text-red-500">Enter a valid email</p>
                                )
                            }
                        </div>

                        

                        <div className="space-y-2 w-full">
                             <div>
                                    <label className="text-slate-900 font-semibold">Password</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <LockIcon className="text-slate-400"/>
                                    <input
                                    onChange={
                                        (event) => {
                                            setPassword(event.target.value);
                                        }
                                    }
                                    onBlur={
                                        () => {
                                            if (/^.{3,35}$/.test(password)) setPasswordError("");
                                            else setPasswordError("invalid");
                                        }
                                    }
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create Password"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                    <button
                                    onClick={
                                        () => {
                                            setShowPassword(!showPassword);
                                        }
                                    }
                                    className="cursor-pointer">
                                        {showPassword ? <EyeOffIcon className="text-slate-400/50"/> : <EyeIcon className="text-slate-400"/>}
                                    </button>
                                </div>
                                {
                                    passwordError && (
                                        <p className="text-sm text-red-500">enter the password</p>
                                    )
                                }
                        </div>

                    </div>)}
                    {isDoctor && (<div className="flex flex-col w-full justify-center items-center space-y-4">
                        <div className="inline-flex items-center justify-center gap-1 text-teal-500 mt-4 text-xs
                        border rounded-full w-fit px-2 bg-teal-300/30">
                            <ShieldIcon className="w-4"/>
                            Doctor Portal
                        </div>

                        <div className="container space-y-2 w-full">
                            <div>
                                <label className="text-slate-900 font-semibold">Email Address</label>
                            </div>
                            <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                <MailIcon className="text-slate-400"/>
                                <input
                                 onChange={
                                    (event) => {
                                        setEmail(event.target.value);
                                    }
                                }
                                onBlur={() => {
                                    
                                    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[a-zA-z]{3,7}$/.test(email)) setEmailError("");
                                    else setEmailError("invalid");
                                }}
                                type="text"
                                placeholder="example@email.com"
                                className="rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                            {
                                emailError && (
                                    <p className="text-sm text-red-500">Enter a valid email</p>
                                )
                            }
                        </div>

                        

                        <div className="space-y-2 w-full">
                             <div>
                                    <label className="text-slate-900 font-semibold">Password</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <LockIcon className="text-slate-400"/>
                                    <input
                                    onChange={
                                        (event) => {
                                            setPassword(event.target.value);
                                        }
                                    }
                                    onBlur={
                                        () => {
                                            if (/^.{3,35}$/.test(password)) setPasswordError("");
                                            else setPasswordError("invalid");
                                        }
                                    }
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create Password"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                    <button
                                    onClick={
                                        () => {
                                            setShowPassword(!showPassword);
                                        }
                                    }
                                    className="cursor-pointer">
                                        {showPassword ? <EyeOffIcon className="text-slate-400/50"/> : <EyeIcon className="text-slate-400"/>}
                                    </button>
                                </div>
                                {
                                    passwordError && (
                                        <p className="text-sm text-red-500">enter the password</p>
                                    )
                                }
                        </div>
                        
                    </div>)}
                    <div className="flex justify-between w-full">
                        
                        <p className="text-slate-700 group">
                            
                        <input
                        type="checkbox"
                        className="mr-2 text-teal-600"/>
                        
                            Remember me
                       

                        </p>

                        <a className="text-teal-600">
                            Forgot Password?
                        </a>

                    </div>

                    <div className="relative w-full group overflow-x-hidden rounded-lg border-b border-slate-300">
                        <button 
                        onClick={
                            () => {
                                if (!isDoctor) handleLogin();
                                else handleLogin();
                            }
                        }
                        className="relative inline-flex gap-3 justify-center items-center
                         text-white bg-transparent w-full p-4 rounded-lg z-10 cursor-pointer">
                            Log In
                            <ArrowRightIcon className="transition-transform duration-500 group-hover:translate-x-10 group-active:translate-x-10"/>
                        </button>

                        <div className="absolute inset-0 bg-teal-600 rounded-lg"></div>

                        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 rounded-lg
                        -translate-x-[100%] transition-all duration-500 group-hover:translate-x-0 group-active:translate-x-0"></div>
                    </div>

                    <p className="text-slate-700 mt-4 pt-6 border-t border-slate-300 w-full text-center">Don`t have an Account? 
                        <a
                        href="/register"
                        className="text-teal-600"> Sign up here</a></p>
                </div>
                <div className="flex w-full justify-center items-center gap-2 text-center py-4">
                    <ShieldIcon className="w-4 h-4 text-slate-400"/>
                    <p className="text-slate-400 sm:text-sm text-xs">
                    
                    Your data is protected with enterprise grade security
                </p>
                </div>
            </div>
        </div>
    );
}