"use client";

import { DashboardHeaderD } from "@/components/dashboard-header";
import { ArrowLeftIcon, FileTextIcon, SearchIcon, ClockIcon, PhoneIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { useState, useEffect } from "react";
import { AppointmentData } from "@/lib/data";
import { StatusBadge } from "@/components/badge";
import { format } from "date-fns";
import { Avatar } from "@/components/avatar";;

export default function Perscription () {

    const [ appointments, setAppointments ] = useState<AppointmentData[]>();

    const params = useParams();

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {

        const fetchData = async () => {

        const res = await fetch(`${apiURL}/data/appointment-query/appointments/filter/doc/${params.id}`);

        if (!res.ok) {

            console.error("Failed to gather data");
            return;
        }

        setAppointments(await res.json());
    }

        fetchData();
        
    }, [params.id]);

    const router = useRouter();

    return (
        <div className="max-w-screen w-full min-h-screen h-full bg-gradient-to-r from-slate-50 via-teal-50 to-white"
        style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderD>
                <button 
                onClick={() => {
                    router.push("dashboard")
                }}
                className="inline-flex gap-3 items-center group hover:bg-slate-100 rounded-lg px-4 py-2 hover:scale-105 
                transition-all duration-300 cursor-pointer text-sm text-slate-600">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-3 transition-transform duration-300"/>
                    Back to Dashboard
                </button>
            </DashboardHeaderD>
            <main className="w-full py-8">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-8 items-center justify-center">
                        <CardHolder>
                            <CardHeader>
                                <h1 className="inline-flex gap-3 items-center text-slate-600 text-xl font-bold tracking-wide">
                                    <FileTextIcon className="text-slate-500"/>
                                    Completed Appointments
                                </h1>
                            </CardHeader>
                            <CardContent className="w-full flex items-center justify-center border rounded-lg border-slate-300">
                                <SearchIcon className="mx-2 text-slate-300"/>
                                <input
                                type="text"
                                placeholder="Search Appointments"
                                className="text-slate-500 placeholder-slate-400 w-full px-4 py-2 rounded-lg focus:outline-none"/>
                            </CardContent>
                        </CardHolder>

                        <div className="grid lg:grid-cols-3 gap-8 items-start justify-center w-full">
                            {
                                appointments?.filter(appointment => appointment.status === 3 || appointment.status === 5).map((appointment, index) => {

                                    return (
                                        <CardHolder key={index} className="rounded-lg bg-slate-50 p-4 w-full">
                                            <CardHeader className="flex items-center justify-between">
                                                <div className="flex items-center w-full gap-2">
                                                    <Avatar src="/man.png" size={16}/>
                                                    <h5 className="text-slate-700 text-lg font-semibold">{appointment.user.firstName + " " + appointment.user.lastName}
                                                        <p className="text-sm text-slate-300">ID: {appointment.user.id}</p>
                                                    </h5>
                                                </div>
                                                <StatusBadge status={appointment.status}/>
                                            </CardHeader>
                                            <CardContent className="flex flex-col gap-4 justify-center py-2">
                                                <p className="inline-flex gap-2 text-sm text-slate-500 items-center">
                                                    <ClockIcon className="w-4 h-4"/>
                                                    { format(appointment.dateTime, "hh:mm a") }
                                                </p>
                                                <p className="inline-flex gap-2 text-sm text-slate-500 items-center">
                                                    <PhoneIcon className="w-4 h-4"/>
                                                    12345 6789
                                                </p>
                                                <p className="inline-flex gap-2 text-sm text-slate-500 items-center">
                                                    <span className="text-slate-600 font-semibold">Reason:</span>
                                                    { appointment.details }
                                                </p>

                                                <p className="text-slate-500 text-sm">Last Updated: {format(new Date(), "MMM dd, yyyy")}</p>
                                                {appointment.status !== 5 && (<button
                                                onClick={() => {

                                                    router.push(`perscription/${appointment.id}/create-perscription`);
                                                }}
                                                className="text-slate-50 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-500
                                                cursor-pointer hover:scale-105 transition-all duration-300 font-semibold">
                                                    Provide Perscription
                                                </button>)}

                                                
                                                        

                                                {appointment.status === 5 && (
                                                    <>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <button
                                                            onClick={() => {

                                                                router.push(`perscription/preview-prescribtion/${appointment.pres_id}/view-prescribtion`);
                                                            }}
                                                            className="text-slate-50 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-500
                                                            cursor-pointer hover:scale-105 transition-all duration-300 font-semibold">
                                                                View Details
                                                            </button>

                                                            <button
                                                            onClick={() => {

                                                                router.push(`perscription/${appointment.id}/create-perscription`);
                                                            }}
                                                            className="text-slate-50 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-500
                                                            cursor-pointer hover:scale-105 transition-all duration-300 font-semibold">
                                                                Provide prescription
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </CardContent>
                                        </CardHolder>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}