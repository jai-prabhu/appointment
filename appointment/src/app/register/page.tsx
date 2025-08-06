/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ArrowLeftIcon, StethoscopeIcon, UserIcon, ShieldIcon } from "lucide-react";
import { RegisterPanelUser, RegisterPanelDoc } from "@/components/auth-panel";


export default function Register () {

    const [isDoctor, setIsDoctor] = useState<boolean>(false);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center
        justify-center p-4" style={{fontFamily: "var(--font-poppins)"}}>
            <div className="container max-w-2xl">
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
                    
                    <h1 className="text-center text-slate-900 text-2xl font-bold mb-2">Create Your Account</h1>
                    <p className=" text-center text-slate-600">Join thousands of users managing their healthcare</p>
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
                    {!isDoctor && (
                    <RegisterPanelUser/>
                    )}
                    {isDoctor && (
                        <RegisterPanelDoc/>
                    )}
                
                </div>
                
                <div className="flex w-full justify-center items-center gap-2 text-center py-4">
                    <ShieldIcon className="w-4 h-4 text-slate-400"/>
                    <p className="text-slate-400 text-xs sm:text-sm">
                    
                    Your data is protected with enterprise grade security & HIPAA compilance.
                    </p>
                </div>
            </div>
        </div>
    );
}