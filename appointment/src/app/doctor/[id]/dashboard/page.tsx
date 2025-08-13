"use client";

import { DashboardHeaderD } from "@/components/dashboard-header";
import { CardHolder, CardHeader, CardContent, PendingSlot, AppointmentSlot } from "@/components/card";
import { useRouter, useParams } from "next/navigation";
import { AppointmentData, DocData } from "@/lib/data";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, FileTextIcon, CircleCheckBigIcon, CircleAlertIcon, CircleIcon, UsersIcon, PillIcon, TrendingUpIcon } from "lucide-react";

export default function DashBoard() {

    const [appointments, setAppointments] = useState<AppointmentData[]>();
    const [docsData, setDocsData] = useState<DocData>();

    const router = useRouter();
    const params = useParams();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/filter/doc/${params.id}`);

            if (!res.ok) {

                console.error("Failed to fetch Data");
                return;
            }

            setAppointments(await res.json());
        }

        fetchData();
    }, [params.id]);

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/doc-query/doc/${params.id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setDocsData(await res.json());
        }

        fetchData();
    }, [params.id])

    return (
        <div className="container max-w-screen w-full" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderD/>

            <main className="w-full bg-gradient-to-br from-slate-50 via-teal-30 to-slate-100 p-4">
                <div className="container w-full mx-auto">
                    <div className="space-y-2 my-8">
                        <h1 className="text-slate-900 text-4xl font-bold">Welcome Back, Dr. {docsData?.user.firstName}</h1>
                        <p className="text-slate-500">You have 4 appointments scheduled for today.</p>
                        
                        <div className="flex gap-8 items-center w-full justify-center">
                            <div className="flex w-full justify-between shadow-md shadow-slate-300 
                            items-center bg-salte-50 p-4 border-t border-slate-300 rounded-lg">
                                <div className="space-y-2">
                                    <p className="text-slate-500">Today`s Patients</p>
                                    <h1 className="text-slate-900 text-2xl font-bold">4</h1>
                                </div>
                                <UsersIcon className="text-teal-600 w-8 h-8"/>
                            </div>

                            <div className="flex w-full justify-between shadow-md shadow-slate-300 
                            items-center bg-salte-50 p-4 border-t border-slate-300 rounded-lg">
                                <div className="space-y-2">
                                    <p className="text-slate-500">This Week</p>
                                    <h1 className="text-slate-900 text-2xl font-bold">28</h1>
                                </div>
                                <CalendarIcon className="text-blue-600 w-8 h-8"/>
                            </div>

                            <div className="flex w-full justify-between shadow-md shadow-slate-300 
                            items-center bg-salte-50 p-4 border-t border-slate-300 rounded-lg">
                                <div className="space-y-2">
                                    <p className="text-slate-500">Pending Reviews</p>
                                    <h1 className="text-slate-900 text-2xl font-bold">7</h1>
                                </div>
                                <FileTextIcon className="text-orange-600 w-8 h-8"/>
                            </div>

                            <div className="flex w-full justify-between shadow-md shadow-slate-300 
                            items-center bg-salte-50 p-4 border-t border-slate-300 rounded-lg">
                                <div className="space-y-2">
                                    <p className="text-slate-500">Patient Rating</p>
                                    <h1 className="text-slate-900 text-2xl font-bold">4.9</h1>
                                </div>
                                <TrendingUpIcon className="text-teal-600 w-8 h-8"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center w-full">
                        <div className="flex flex-col gap-8 justify-center items-center w-full">
                            <CardHolder>
                                <CardHeader>
                                    <h3 className="text-slate-900 font-bold text-2xl">Quick Actions</h3>
                                </CardHeader>
                                <CardContent>
                                    <button
                                    onClick={
                                        () => { router.push("appointments"); }
                                    }
                                    className="flex flex-col gap-2 w-full bg-orange-600 text-sm p-4 justify-center items-center rounded-lg font-semibold
                                    hover:bg-orange-500 cursor-pointer hover:scale-105 transition-all duration-300">
                                        <CircleAlertIcon className="text-slate-50"/>
                                        Review Requests
                                    </button>

                                    <button
                                    onClick={
                                        () => {
                                            router.push("calendar");
                                        }
                                    }
                                    className="flex flex-col gap-2 bg-slate-50 w-full p-4 justify-center items-center rounded-lg
                                    border border-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-100 cursor-pointer hover:scale-105 transition-all duration-300">
                                        <CalendarIcon className="text-slate-500"/>
                                        Calendar View
                                    </button>

                                    <button
                                    onClick={
                                        () => {
                                            router.push("records")
                                        }
                                    }
                                    className="flex flex-col gap-2 bg-slate-50 w-full p-4 justify-center text-sm items-center rounded-lg font-semibold
                                    border border-slate-300 text-slate-900 hover:bg-slate-100 cursor-pointer hover:scale-105 transition-all duration-300">
                                        <FileTextIcon className="text-slate-500"/>
                                        Records
                                    </button>

                                    <button
                                    onClick={
                                        () => {
                                            router.push("perscription");
                                        }
                                    }
                                    className="flex  flex-col gap-2 bg-slate-50 w-full p-4 justify-center items-center rounded-lg font-semibold
                                    border border-slate-300 text-slate-900 text-sm hover:bg-slate-100 cursor-pointer hover:scale-105 transition-all duration-300">
                                        <PillIcon className="text-slate-500"/>
                                        Prescription
                                    </button>
                                </CardContent>
                            </CardHolder>
                            <CardHolder>
                                <CardHeader className="flex justify-between items-center">
                                    <div className="space-y-2">
                                        <h3 className="text-slate-900 font-bold text-2xl">Pending Requests</h3>
                                        <p className="text-slate-500 text-sm">Patients waiting for your approval</p>
                                    </div>
                                    <button 
                                    onClick={
                                        () => { router.push("appointments"); }
                                    }
                                    className="text-slate-900 border border-slate-300 font-semibold px-4 py-2 rounded-lg
                                    hover:bg-slate-100 hover:shadow-md shadow-slate-300 cursor-pointer">
                                        View all
                                    </button>
                                </CardHeader>
                                <CardContent className="space-y-4 w-full">
                                    {
                                        !appointments?.filter(appointment => appointment.status === 2).length && (
                                            <h1 className="text-slate-500 text-center text-2xl">No Pending Requests</h1>
                                        )
                                    }
                                    {
                                        appointments?.filter(appointment => appointment.status === 2).map((appointment, index) => {

                                            return (
                                                <PendingSlot
                                                key={index}
                                                id={appointment.id}
                                                imgSrc="/man.png"
                                                date={appointment?.dateTime ? format(new Date(appointment?.dateTime), "MMM dd, yyyy") : ``}
                                                name={appointment.user.firstName + " " + appointment.user.lastName}
                                                specialization={appointment.type}
                                                time={appointment?.dateTime ? format(new Date(appointment?.dateTime), "hh:mm a") : ``}
                                                
                                                status={appointment.status}/>
                                            )
                                        })
                                    }
                                </CardContent>
                            </CardHolder>
                            <CardHolder>
                                <CardHeader className="flex justify-between items-center">
                                    <div className="space-y-2">
                                        <h3 className="text-slate-900 font-bold text-2xl">Upcomming Appointments</h3>
                                        <p className="text-slate-500 text-sm">Your scheduled medical appointments</p>
                                    </div>
                                    <button 
                                    onClick={() => {

                                        router.push("appointments");
                                    }}
                                    className="text-slate-900 border border-slate-300 font-semibold px-4 py-2 rounded-lg
                                    hover:bg-slate-100 hover:shadow-md shadow-slate-300">
                                        View all
                                    </button>
                                </CardHeader>
                                <CardContent className="space-y-4 w-full">
                                    {
                                        !appointments?.filter(appointment => appointment.status === 1).length && (
                                            <h1 className="text-slate-500 text-2xl text-center">No Upcomming appointments</h1>
                                        )
                                    }
                                    {
                                        appointments?.filter(appointment => appointment.status === 1).map((appointment, index) => {

                                            return (
                                                <AppointmentSlot
                                                key={index}
                                                pres_id={appointment.pres_id}
                                                id={appointment.id}
                                                imgSrc="/man.png"
                                                name={appointment.user.firstName + " " + appointment.user.lastName}
                                                specialization={appointment.type}
                                                time={appointment?.dateTime ? format(new Date(appointment?.dateTime), "hh:mm a") : ``}
                                                date={appointment?.dateTime ? format(appointment.dateTime, "MMM dd, yyyy"): ``}
                                                
                                                status={appointment.status}/>
                                            )
                                        })
                                    }
                                </CardContent>
                            </CardHolder>
                            <CardHolder>
                                <CardHeader className="space-y-2">
                                    <h3 className="text-slate-900 font-bold text-2xl">Current Queue</h3>
                                    <p className="text-slate-500 text-sm">Patient waiting to be seen.</p>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center bg-blue-100 w-full px-4 py-2 rounded-lg">
                                        <h5 className="inline-flex gap-3 items-center text-slate-900">
                                            <CircleCheckBigIcon className="text-blue-600"/>
                                            Sarah Johnson
                                        </h5>
                                        <p className="text-xs text-blue-600 border border-blue-600 bg-blue-200 px-2 rounded-lg">
                                            in-progress
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center bg-orange-100 w-full px-4 py-2 rounded-lg">
                                        <h5 className="inline-flex gap-3 items-center text-slate-900">
                                            <CircleAlertIcon className="text-orange-600"/>
                                            Michael Brown
                                        </h5>
                                        <p className="text-xs text-orange-600 border border-orange-600 bg-orange-200 px-2 rounded-lg">
                                            waiting
                                        </p>
                                    </div>
                                </CardContent>
                            </CardHolder>
                        </div>
                        <div className="flex flex-col gap-4 w-1/2">
                            <CardHolder>
                                <CardHeader>
                                    <h3 className="text-slate-900 text-2xl font-bold">Recent Activity</h3>
                                </CardHeader>
                                <CardContent className="w-full space-y-8">
                                    <div className="flex gap-2 mt-8 items-center">
                                        <CircleIcon className="w-3 h-3 text-teal-600"/>
                                        <h5 className=" gap-2 text-slate-900 items-center text-sm">
                                            Appointment confirmed with Dr.Johnson
                                            <p className="text-slate-500 text-xs">2 hours ago</p>
                                        </h5> 
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <CircleIcon className="w-3 h-3 text-teal-600"/>
                                        <h5 className=" gap-2 text-slate-900 items-center text-sm">
                                            Prescription refill approved
                                            <p className="text-slate-500 text-xs">1 day ago</p>
                                        </h5> 
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <CircleIcon className="w-3 h-3 text-teal-600"/>
                                        <h5 className=" gap-2 text-slate-900 items-center text-sm">
                                            Lab results available
                                            <p className="text-slate-500 text-xs">3 days ago</p>
                                        </h5> 
                                    </div>
                                </CardContent>
                            </CardHolder>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}