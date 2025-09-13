/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { type AppointmentData } from "@/lib/data"; 
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { Avatar } from "@/components/avatar";
import { format } from "date-fns";
import "./animation.css";

export default function Cancel() {

    const [appointment, setAppointment] = useState<AppointmentData>();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const params = useParams();

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${apiURL}/data/appointment-query/appointments/${params.appointment_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setAppointment(await res.json());
        }

        fetchData();
    }, [params.appointment_id]);

    return (
        <div className="max-w-screen bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
             {isLoading && (

                <div className="min-h-screen min-w-screen flex flex-col gap-8 text-center justify-center items-center bg-slate-50">
                    <div
                    style={{
                        animation: "rotate 2s linear infinite"
                    }}
                    className="w-24 h-24 border-l-transparent border-6 rounded-full border-teal-600 rotate"></div>
                    <h1 className="text-slate-900 font-semibold text-2xl">Canceling Appointment...
                        <p className="text-slate-500 text-lg font-normal">Please wait, while we are canceling your appointment</p>
                    </h1>
                </div>
            )}
            <header className="sticky top-0 w-full bg-slate-50 border-b boder-slate-30 shadow-md shadow-slate-30 z-20">
                <div className="container mx-auto py-4">
                    <div className="flex items-center w-full gap-4">
                        <button className="inline-flex gap-4 items-center justify-center text-slate-700 text-sm
                        cursor-pointer px-4 py-2 hover:bg-slate-100 rounded-lg group">
                            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"/>
                            Back to Appointments
                        </button>
                        <img
                        src="/logo.svg"
                        alt="logo"
                        className="w-12 h-auto"/>
                        <h3 className="text-2xl text-slate-900 font-semibold">Schedula</h3>
                    </div>
                </div>
            </header>
            <main className="w-full py-8">
                <div className="container max-w-4xl mx-auto">
                    <div className="flex flex-col gap-8 items-center">
                        <CardHolder>
                            <CardHeader>
                                <h1 className="text-slate-900 font-bold text-xl">Appointment to Cancel</h1>
                            </CardHeader>
                            <CardContent className="flex items-center justify-start gap-2">
                                <Avatar src="/doc.png" size={16}/>

                                <div className="">
                                    <h5 className="text-slate-900 font-semibold text-lg">{appointment?.doc.user.firstName + " " + appointment?.doc.user.lastName}</h5>

                                    <p className="text-slate-500 text-sm">{appointment?.doc.specialization}</p>

                                    <div className="grid grid-cols-3 w-full">
                                        <p className="inline-flex gap-2 text-sm text-slate-500 py-2">
                                            <CalendarIcon className="w-4 h-4"/>
                                            {appointment?.dateTime ? format(new Date(appointment?.dateTime), "MMM dd, yyyy") : ``}
                                        </p>
                                        <p className="inline-flex gap-2 text-sm text-slate-500 py-2">
                                            <ClockIcon className="w-4 h-4"/>
                                            {appointment?.dateTime ? format(new Date(appointment?.dateTime), "hh:mm a") : ``}
                                        </p>
                                        <p className="inline-flex gap-2 text-sm text-slate-500 py-2">
                                            <MapPinIcon className="w-4 h-4"/>
                                            {appointment?.doc.user.location}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </CardHolder>

                        <CardHolder>
                            <CardHeader>
                                 <h1 className="text-slate-900 font-bold text-xl">Reason for Cancellation</h1>
                            </CardHeader>
                            <CardContent className="text-slate-700 space-y-2">
                                <h5>Please select a reason:</h5>
                                
                                <div className="flex flex-col gap-2">
                                    <p className="inline-flex gap-2 items-center">
                                        <input
                                        type="radio"
                                        value="Schedule Conflict"
                                        name="reason"
                                        className=""/>

                                        Schedule Conflict
                                    </p>

                                    <p className="inline-flex gap-2 items-center">
                                        <input
                                        type="radio"
                                        value="Feeling better, no longer need appointment"
                                        name="reason"
                                        className=""/>

                                        Feeling better, no longer need appointment
                                    </p>

                                    <p className="inline-flex gap-2 items-center">
                                        <input
                                        type="radio"
                                        value="Found aother doctor"
                                        name="reason"
                                        className=""/>

                                        Found aother doctor
                                    </p>

                                    <p className="inline-flex gap-2 items-center">
                                        <input
                                        type="radio"
                                        value="Transportation issues"
                                        name="reason"
                                        className=""/>

                                        Transportation issues
                                    </p>

                                    <p className="inline-flex gap-2 items-center">
                                        <input
                                        type="radio"
                                        value="Other"
                                        name="reason"
                                        className=""/>

                                        Other
                                    </p>
                                    
                                </div>
                                

                            </CardContent>
                        </CardHolder>

                        <div className="grid grid-cols-2 gap-8 w-full items-center justify-center">
                            <button 
                            className="text-slate-700 border border-slate-300 px-4 py-2 rounded-lg hover:scale-105 hover:bg-slate-100
                            transition-all duration-300 cursor-pointer">
                                Keep Appointment    
                            </button>
                            <button
                            onClick={
                               () => {

                                    setIsLoading(true);

                                    

                                   const data = async () => {const res = await fetch(`${apiURL}/data/appointment-query/appointments/update/${appointment?.id}`, {

                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            status: 4
                                        })
                                    })
                                    
                                    if (!res.ok) {

                                        console.error("Failed to fetch the data")
                                        return;
                                        
                                    }
                                
                                }

                                data();

                                setTimeout(() => {
                                    router.push(`/patient/${appointment?.user.id}/dashboard`);
                                }, 2000)

                                    
                                    
                                }
                            } 
                            className="text-slate-50 border border-slate-300 bg-red-500/90 px-4 py-2 rounded-lg hover:scale-105 hover:bg-red-400
                            transition-all duration-300 cursor-pointer">
                                Cancel Appointment    
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}