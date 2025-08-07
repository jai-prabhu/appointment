/* eslint-disable @next/next/no-img-element */
"use client";

import { UserIcon, BellIcon, SettingsIcon, LogOutIcon, ShieldIcon } from "lucide-react";
import { Avatar } from "./avatar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { type DocData, type UserData } from "../lib/data";

export const DashboardHeaderD = ({ children } :{ children?: ReactNode }) => {

    const [data, setData] = useState<DocData>();
    
    const params = useParams();
    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/doc-query/doc/${params.id}`)
                
            const resData = await res.json();
            if (!res.ok) {
                console.error("failed to feth data")
                return;                
            }
            
            setData(resData);
        }

        fetchData();
    }, [params.id]);

    return (
        <header className="sticky top-0 backdrop-blur-md container overflow-hidden bg-gradient-to-r from-slate-50
         to-white max-w-screen w-full select-none border-b shadow-md shadow-slate-300">
            <div className="container flex justify-between items-center gap-3 mx-auto p-2">
                <div className="flex gap-4 justify-center items-center">

                    { children }
                    
                    <h1 className="inlince gap-2 flex items-center text-slate-900 font-bold">
                        <img
                        src="\Logo.svg"
                        alt="Logo"
                        className="w-12 h-auto"/>
                        Schedula
                    </h1>

                    <label className="inline-flex gap-1 items-center text-teal-600 bg-teal-100/60 border border-teal-500 px-2 rounded-lg text-xs">
                        <ShieldIcon className="w-3 h-3"/>
                        Doctor Portal
                    </label>
                </div>
                
                <div className="flex gap-6 items-center justify-center">
                    <button className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
                        <BellIcon className="text-slate-900 w-5 h-5"/>
                    </button>
                    <div className="flex gap-2 items-center">
                        <Avatar src="/doc.png" size={12}/>

                        <h3 className="text-slate-900 font-bold">{data?.user.firstName + " " + data?.user.lastName}
                            <p className="text-slate-400 font-normal text-xs">{data?.specialization}</p>
                        </h3>
                    </div>
                    <button className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
                        <SettingsIcon className="text-slate-900 w-5 h-5"/>
                    </button>
                    <button 
                    onClick={() => {
                        router.push("/")
                    }}
                    className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
                        <LogOutIcon className="text-slate-900 w-5 h-5"/>
                    </button>
                </div>
            </div>
        </header>
    )
}

export const DashboardHeaderP =  () => {

    const [data, setData] = useState<UserData>();
    
    const params = useParams();
    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/user-query/user/${params.user_id}`)
                
            const resData = await res.json();
            if (!res.ok) {
                console.error("failed to feth data")
                return;                
            }
            
            setData(resData);
        }

        fetchData();
    }, [params.user_id]);

    return (
        <header className="sticky top-0 backdrop-blur-md container overflow-hidden bg-gradient-to-r from-slate-50
         to-white max-w-screen w-full select-none border-b shadow-md shadow-slate-300">
            <div className="container flex justify-between items-center gap-3 mx-auto p-2">
                <div className="flex gap-4 justify-center items-center">
                    
                    <h1 className="inlince flex gap-2 items-center text-slate-900 font-bold">
                        <img
                        src="\Logo.svg"
                        alt="Logo"
                        className="w-12 h-auto"/>
                        Schedula
                    </h1>

                    <label className="inline-flex gap-1 items-center text-blue-600 bg-blue-100/60 border border-blue-500 px-2 rounded-lg text-xs">
                        <UserIcon className="w-3 h-3"/>
                        Patient Portal
                    </label>
                </div>
                
                <div className="flex gap-6 items-center justify-center">
                    <button className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
                        <BellIcon className="text-slate-900 w-5 h-5"/>
                    </button>
                    <div className="flex gap-2 items-center">
                        <Avatar src="/doc.png" size={12}/>

                        <h3 className="text-slate-900 font-bold">{data?.firstName + " " + data?.lastName}
                            <p className="text-slate-400 font-normal text-xs">Patient ID: #{data?.id}</p>
                        </h3>
                    </div>
                    <button className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
                        <SettingsIcon className="text-slate-900 w-5 h-5"/>
                    </button>
                    <button 
                    onClick={() => {
                        router.push("/")
                    }}
                    className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
                        <LogOutIcon className="text-slate-900 w-5 h-5"/>
                    </button>
                </div>
            </div>
        </header>
    );
}