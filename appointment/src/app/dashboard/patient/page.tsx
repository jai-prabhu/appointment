"use client";

import { DashboardHeaderP } from "@/components/dashboard-header";
import { CardHolder, CardHeader, CardContent, AppointmentSlot } from "@/components/card";
import { PlusIcon, CalendarIcon, FileTextIcon, HeartIcon, CircleCheckBigIcon, ClockIcon, CircleIcon } from "lucide-react";

export default function DashBoard() {

    return (
        <div className="container max-w-screen w-full" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderP/>

            <main className="w-full bg-gradient-to-br from-slate-50 via-teal-30 to-slate-100 p-4">
                <div className="container w-full mx-auto">
                    <div className="space-y-2 my-8">
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
                                    <a
                                    href=""
                                    className="flex flex-col gap-2 w-full bg-teal-600 p-4 justify-center items-center rounded-lg font-semibold
                                    hover:bg-teal-500">
                                        <PlusIcon className="text-slate-50"/>
                                        Book Appointment
                                    </a>

                                    <a
                                    href=""
                                    className="flex flex-col gap-2 bg-slate-50 w-full p-4 justify-center items-center rounded-lg
                                    border border-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-100">
                                        <CalendarIcon/>
                                        Calendar View
                                    </a>

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
                                    <a 
                                    href=""
                                    className="text-slate-900 border border-slate-300 font-semibold px-4 py-2 rounded-lg
                                    hover:bg-slate-100 hover:shadow-md shadow-slate-300">
                                        View all
                                    </a>
                                </CardHeader>
                                <CardContent className="space-y-4 w-full">
                                    <AppointmentSlot
                                    imgSrc="/doc.png"
                                    name="Dr. Sarah Johnson"
                                    specialization="Cardiology"
                                    date="Today"
                                    time="2:30 PM"
                                    location="Room 205"
                                    type={0}/>

                                    <AppointmentSlot
                                    imgSrc="/doc.png"
                                    name="Dr. Michael Chen"
                                    specialization="General Medicine"
                                    date="Tomorrow"
                                    time="10:00 AM"
                                    location="Room 101"
                                    type={0}/>

                                    <AppointmentSlot
                                    imgSrc="/doc.png"
                                    name="Dr. Emily Davis"
                                    specialization="Dematology"
                                    date="Dec 15"
                                    time="3:45 PM"
                                    location="Room 308"
                                    type={0}/>
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
                                        <h3 className="text-teal-600 text-2xl font-bold">3</h3>
                                        <p className="text-slate-500">Upcoming</p>
                                        <p className="text-slate-500 text-xs">Next: Today 2:30 PM</p>
                                    </a>

                                    <a
                                    href=""
                                    className="flex flex-col items-center gap-1 bg-blue-100 rounded-lg py-6 w-full px-8">
                                        <CircleCheckBigIcon className="text-blue-600 w-8 h-8"/>
                                        <h3 className="text-blue-600 text-2xl font-bold">12</h3>
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
        </div>
    );
}