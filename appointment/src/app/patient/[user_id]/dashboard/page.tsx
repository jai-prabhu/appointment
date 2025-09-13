"use client";

import { useState, useEffect } from "react";
import { DashboardHeaderP } from "@/components/dashboard-header";
import { CardHolder, CardHeader, CardContent, AppointmentSlot } from "@/components/card";
import { type AppointmentData } from "@/lib/data";
import { PlusIcon, CalendarIcon, FileTextIcon, HeartIcon, CircleCheckBigIcon, ClockIcon, CircleIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import Footer from "@/components/footer";

export default function DashBoard() {

    const [appointments, setAppointments] = useState<AppointmentData[]>();

    const router = useRouter();
    const params = useParams();

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${apiURL}/data/appointment-query/appointments/filter/${params.user_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
            }

            setAppointments(await res.json());
        }

        fetchData();
    }, [params.user_id]);

    return (
        <div className="container max-w-screen w-full" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderP/>

            <main className="w-full bg-gradient-to-br from-slate-50 via-teal-30 to-slate-100 p-4 py-16">
                <div className="container w-full mx-auto">
                    <div className="space-y-2">
                        <h1 className="text-slate-900 text-4xl font-bold">Welcome Back, John</h1>
                        <p className="text-slate-500">Here`s what`s happening with your health today.</p>
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
                                        () => {
                                            router.push(`/patient/${params.user_id}/doctors`);
                                        }
                                    }
                                    className="flex flex-col gap-2 w-full bg-teal-600 p-4 justify-center items-center rounded-lg font-semibold
                                    hover:bg-teal-500 cursor-pointer">
                                        <PlusIcon className="text-slate-50"/>
                                        Book Appointment
                                    </button>

                                    <button
                                    onClick={() => {
                                        router.push(`calendar`);
                                    }}
                                    className="flex flex-col gap-2 bg-slate-50 w-full p-4 justify-center items-center rounded-lg
                                    border border-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-100 cursor-pointer">
                                        <CalendarIcon/>
                                        Calendar View
                                    </button>

                                    <a
                                    href=""
                                    className="flex flex-col gap-2 bg-slate-50 w-full p-4 justify-center items-center rounded-lg font-semibold
                                    border border-slate-300 text-slate-900 hover:bg-slate-100">
                                        <FileTextIcon/>
                                        Records
                                    </a>

                                    <a
                                    href=""
                                    className="flex  flex-col gap-2 bg-slate-50 w-full p-4 justify-center items-center rounded-lg font-semibold
                                    border border-slate-300 text-slate-900 hover:bg-slate-100">
                                        <HeartIcon/>
                                        Prescription
                                    </a>
                                </CardContent>
                            </CardHolder>
                            <CardHolder>
                                <CardHeader className="flex justify-between items-center">
                                    <div className="space-y-2">
                                        <h3 className="text-slate-900 font-bold text-2xl">Upcomming Appointments</h3>
                                        <p className="text-slate-500 text-sm">Your scheduled medical appointments</p>
                                    </div>
                                    <button 
                                    onClick={
                                        () => {
                                            router.push(`appointments`);
                                        }
                                    }
                                    className="text-slate-900 border border-slate-300 font-semibold px-4 py-2 rounded-lg
                                    hover:bg-slate-100 hover:shadow-md shadow-slate-30 cursor-pointer">
                                        View all
                                    </button>
                                </CardHeader>
                                <CardContent className="space-y-4 w-full">
                                    {
                                       appointments?.slice(0, 3).map(
                                        (appointment, index) => {

                                            return (
                                                <AppointmentSlot
                                                key={index}
                                                id={appointment.id}
                                                pres_id={appointment.pres_id}
                                                imgSrc="/doc.png"
                                                name={appointment.doc.user.firstName + " " + appointment.doc.user.lastName}
                                                specialization={appointment.doc.specialization}
                                                date={format(appointment.dateTime, "MMM, dd, yyyy")}
                                                time={format(appointment.dateTime, "hh:mm a")}
                                                location={appointment.doc.user.location}
                                                status={appointment.status}/>
                                            );
                                        }
                                       )
                                    }
                                </CardContent>
                            </CardHolder>
                            <CardHolder>
                                <CardHeader className="space-y-2">
                                    <h3 className="text-slate-900 font-bold text-2xl">Appointment Status</h3>
                                    <p className="text-slate-500 text-sm">Overview of your appointments.</p>
                                </CardHeader>
                                <CardContent>
                                    <a
                                    href=""
                                    className="flex flex-col items-center gap-1 bg-teal-100 rounded-lg py-6 w-full px-8">
                                        <CalendarIcon className="text-teal-600 w-8 h-8"/>
                                        <h3 className="text-teal-600 text-2xl font-bold">{appointments?.length}</h3>
                                        <p className="text-slate-500">Upcoming</p>
                                        <p className="text-slate-500 text-xs">Next: Today 2:30 PM</p>
                                    </a>

                                    <a
                                    href=""
                                    className="flex flex-col items-center gap-1 bg-blue-100 rounded-lg py-6 w-full px-8">
                                        <CircleCheckBigIcon className="text-blue-600 w-8 h-8"/>
                                        <h3 className="text-blue-600 text-2xl font-bold">2</h3>
                                        <p className="text-slate-500">Completed</p>
                                        <p className="text-slate-500 text-xs">This year</p>
                                    </a>

                                    <a
                                    href=""
                                    className="flex flex-col items-center gap-1 bg-orange-100 rounded-lg py-6 w-full px-8">
                                        <ClockIcon className="text-orange-600 w-8 h-8"/>
                                        <h3 className="text-orange-600 text-2xl font-bold">1</h3>
                                        <p className="text-slate-500">Pending</p>
                                        <p className="text-slate-500 text-xs">Awaiting Confirmation</p>
                                    </a>
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
            <Footer/>
        </div>
    );
}