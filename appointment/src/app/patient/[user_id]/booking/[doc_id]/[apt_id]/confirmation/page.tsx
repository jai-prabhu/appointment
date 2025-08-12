/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { CheckIcon, PhoneIcon, MailIcon, CalendarIcon, MapPinIcon, ClockIcon, DownloadIcon, ShareIcon } from "lucide-react";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { Avatar } from "@/components/avatar";
import { AppointmentData } from "@/lib/data";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import "./animation.css";

export default function Confirmation () {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [appointment, setAppointment] = useState<AppointmentData>();

    const router = useRouter();
    const params = useParams();

    useEffect(() => {

        const timer = setTimeout(
            () => {

                setIsLoading(false);
            }, 3000
        )

        return () => { clearTimeout(timer) };
    }, []);

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/${params.apt_id}`);

            if (!res.ok) {

                console.error("failed to fetch data");
                return;
            }

            const data = await res.json();

            console.log(data);

            setAppointment(data)
        }

        fetchData()
    }, [params.apt_id]);

    return (
        <div className="max-w-screen w-full" style={{fontFamily: "var(--font-poppins)"}}>

            {isLoading && (

                <div className="min-h-screen min-w-screen flex flex-col gap-8 text-center justify-center items-center bg-slate-50">
                    <div
                    style={{
                        animation: "rotate 2s linear infinite"
                    }}
                    className="w-24 h-24 border-l-transparent border-6 rounded-full border-teal-600 rotate"></div>
                    <h1 className="text-slate-900 font-semibold text-2xl">Processing Payments...
                        <p className="text-slate-500 text-lg font-normal">Please wait, while we are confirming your appointment</p>
                    </h1>
                </div>
            )}

            <header className="sticky top-0 w-full bg-slate-50 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex gap-4 items-center">
                            <img
                            src="/logo.svg"
                            alt="logo"
                            className="w-12 h-12"/>

                            <h3 className="text-slate-900 text-2xl font-bold">Schedula</h3>
                        </div>

                        <button
                        onClick={() => {
                            router.push(`/patient/${params.user_id}/dashboard`);
                        }}
                        className="text-slate-900 font-semibold border border-slate-300 px-4
                        py-2 rounded-lg shadow-sm shadow-slate-300 hover:bg-slate-100 hover:scale-105 transition-all duration-500 cursor-pointer">
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </header>

            <main className="w-full bg-gradient-to-r from-slate-50 via-teal-50 to-white pt-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex flex-col justify-center items-center gap-6 w-full">
                        <div className="flex w-24 h-24 bg-green-200 items-center justify-center rounded-full">
                            <CheckIcon className="text-teal-600 w-12 h-12"/>
                        </div>
                        
                        <h1 className="text-slate-900 text-center w-full text-4xl font-bold">
                            Appointment Confirmed!

                            <p className="text-base font-normal text-slate-500">Your appointmern has been successfully booked and confirmed.</p>
                        </h1>

                        <CardHolder className="px-4 py-6 rounded-lg bg-slate-50">
                            <CardHeader className="flex justify-between items-center">
                                <h1 className="text-slate-900 font-bold text-2xl">Appointment Details</h1>
                                <p className="text-teal-600 bg-green-100 border px-2 text-xs rounded-lg border-teal-600">Confirmed</p>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6 items-center justify-center pt-4">
                                <div className="flex items-center justify-start w-full gap-2 border-b pb-6 border-slate-300">
                                    <Avatar src="/doc.png" size={16}/>

                                    <div className="">
                                        <h3 className="text-slate-700 font-semibold text-lg">{appointment?.doc.user.firstName + " " + appointment?.doc.user.lastName}</h3>

                                        <p className="text-slate-500 text-sm">{appointment?.doc?.specialization}</p>

                                        <p className="inline-flex gap-2 items-center justify-cente text-slate-500 text-sm">
                                            <PhoneIcon className="w-4 h-4"/> 12345 6789
                                            <MailIcon className="w-4 h-4"/> {appointment?.doc.user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 w-full gap-4">
                                    <div className="flex gap-2 items-center justify-start w-full">
                                        <CalendarIcon className="text-slate-500"/>
                                        <h5 className="text-slate-600">
                                            Date

                                            <p className="text-slate-500">{appointment?.dateTime ? format(new Date(appointment?.dateTime), "MMM dd, yyyy") : ``}</p>
                                        </h5>
                                    </div>

                                    <div className="flex gap-2 items-center justify-start w-full">
                                        <MapPinIcon className="text-slate-500"/>
                                        <h5 className="text-slate-600">
                                            Location

                                            <p className="text-slate-500">{appointment?.doc.user.location}</p>
                                        </h5>
                                    </div>

                                    <div className="flex gap-2 items-center justify-start w-full">
                                        <ClockIcon className="text-slate-500"/>
                                        <h5 className="text-slate-600">
                                            Time

                                            <p className="text-slate-500">{appointment?.dateTime ? format(new Date(appointment?.dateTime), "hh:mm a") : ``}</p>
                                        </h5>
                                    </div>

                                    <div className="flex gap-2 items-center justify-start w-full">
                                        <ClockIcon className="text-slate-500"/>
                                        <h5 className="text-slate-600">
                                            Duration

                                            <p className="text-slate-500">45 minutes</p>
                                        </h5>
                                    </div>
                                </div>

                                <div className="flex w-full justify-between items-center px-4 py-6 bg-slate-100 rounded-lg">
                                    <h1 className="text-slate-700 font-semibold">
                                        Appointment ID
                                        <p className="text-sm font-normal text-slate-500">{appointment?.id}</p>
                                    </h1>

                                    <h1 className="text-slate-700 font-semibold ">Amount Paid
                                        <p className="text-4xl text-teal-600 font-bold text-center">${appointment?.doc?.cost}</p>
                                    </h1>
                                </div>
                            </CardContent>
                        </CardHolder>

                        <div className="grid grid-cols-3 gap-6 items-center justify-center w-full">
                            <button className="inline-flex gap-2 items-center justify-center font-semibold text-slate-700 px-4 py-2 rounded-lg border border-slate-300
                            hover:bg-slate-100 hover:scale-105 transition-all duration-300 cursor-pointer">
                                <DownloadIcon className="w-5 h-5"/> Download Reciept
                            </button>

                            <button className="inline-flex gap-2 items-center justify-center font-semibold text-slate-700 px-4 py-2 rounded-lg border border-slate-300
                            hover:bg-slate-100 hover:scale-105 transition-all duration-300 cursor-pointer">
                                <ShareIcon className="w-5 h-5"/> Share Reciept
                            </button>

                            <button 
                            onClick={
                                () => {
                                    router.push("../../../appointments");
                                }
                            }
                            className="inline-flex gap-2 items-center justify-center font-semibold text-slate-700 px-4 py-2 rounded-lg border border-slate-300
                            hover:bg-slate-100 hover:scale-105 transition-all duration-300 cursor-pointer">
                                <CalendarIcon className="w-5 h-5"/> View All Appointments
                            </button>
                        </div>               
                    </div>
                </div>
            </main>
        </div>
    )
}