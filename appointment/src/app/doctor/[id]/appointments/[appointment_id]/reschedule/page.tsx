"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { Avatar } from "@/components/avatar";
import { StatusBadge } from "@/components/badge"
import { format, parse } from "date-fns";
import { DashboardHeaderD } from "@/components/dashboard-header";
import { type AppointmentData } from "@/lib/data";

export default function Reschedule() {

    const [ appointment, setAppointment ] = useState<AppointmentData>();
    const [ date, setDate ] = useState("");
    const [ selectedTime, setSelectedTime ] = useState("");
    const [ disabled, setDisabled ] = useState<boolean>(false);

    const router = useRouter();
    const params = useParams();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/${params.appointment_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setAppointment(await res.json());
        }

        fetchData()
    }, [params.appointment_id]);

    const timeSlots = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
    ]

    return (
        <div className="max-w-screen w-full min-h-screen bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderD>
                <button
                onClick={() => {

                    router.push("../../appointments");
                }}
                className="inline-flex gap-2 items-center rounded-lg px-4 py-2 hover:bg-slate-100 
                cursor-pointer group text-slate-900 text-sm hover:scale-105 transition-all duration-300">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"/>
                    Back
                </button>
            </DashboardHeaderD>
            <main className="w-full py-8">
                <div className="container max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 justify-center gap-8">
                        <CardHolder className="w-full rounded-lg bg-slate-50 p-4 col-span-2">
                            <CardHeader>
                                <h1 className="inline-flex gap-3 items-center text-slate-900 text-2xl font-bold">
                                    <CalendarIcon/>
                                    Current Appointment Details
                                </h1>
                            </CardHeader>
                            <CardContent className="flex gap-4 items-center">
                                <Avatar src="/man.png" size={16}/>
                                <div className="">
                                    <h5 className="inline-flex gap-4 items-center text-slate-900 font-bold">
                                        { appointment?.user.firstName + " " + appointment?.user.lastName }
                                        <StatusBadge status={appointment? appointment?.status : 2}/>
                                    </h5>
                                    <p className="text-slate-500 text-sm">{ appointment?.type }</p>
                                    <div className="grid grid-cols-3 items-center w-full pt-2">
                                        <p className="inline-flex gap-2 items-center text-slate-500 text-sm">
                                            <CalendarIcon className="w-4 h-4"/>
                                            { appointment ? `${format(appointment.dateTime, "MMM dd, yyyy")}` : ``}
                                        </p>
                                        <p className="inline-flex gap-2 items-center text-slate-500 text-sm">
                                            <ClockIcon className="w-4 h-4"/>
                                            { appointment ? `${format(appointment.dateTime, "hh:mm a")}` : ``}
                                        </p>
                                        <p className="inline-flex gap-2 items-center text-slate-500 text-sm">
                                            <MapPinIcon className="w-4 h-4"/>
                                            { appointment?.user.location }
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </CardHolder>
                        <CardHolder>
                            <CardHeader>
                                <h1 className="text-slate-900 text-2xl font-bold">
                                    Select New Data & Time
                                </h1>
                            </CardHeader>
                            <CardContent className="w-full">
                                <div className="space-y-2">
                                    <h1 className="text-slate-700 font-bold">Select Date</h1>
                                    <input
                                    type="date"
                                    onChange={(event) => {
                                        
                                        setDate(event.target.value);
                                    }}
                                    className="px-4 py-2 w-full focus:outline-none border border-slate-300 rounded-lg
                                    text-slate-600"/>

                                    { date && (

                                        <div className="space-y-2 w-full">
                                            <h1 className="text-slate-900 font-bold">Available Time Slots</h1>

                                            <div className="grid grid-cols-2 gap-8  w-full">
                                                {
                                                    timeSlots.map((time, index) => {

                                                        return (
                                                            <button
                                                            key={index}
                                                            onClick={
                                                                () => {
                                                                    setSelectedTime(time);
                                                                }
                                                            }
                                                            className={`font-semibold ${selectedTime === time? `bg-teal-600 hover:bg-teal-500 text-white` : `bg-slate-50 hover:bg-slate-100 text-slate-500`} text-sm border px-8 py-6 rounded-lg
                                                            border-slate-300 hover:border-teal-600  cursor-pointer transition-all hover:scale-105 duration-500`}>
                                                                {time}
                                                            </button>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </CardHolder>
                        <CardHolder>
                            <CardHeader>
                                <h1 className="text-slate-900 text-2xl font-bold">
                                    Reschedule Details
                                </h1>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <h5 className="text-slate-900 font-bold text-sm">Reason for Rescheduling (Optional)</h5>
                                <textarea
                                rows={5}
                                placeholder="Please let us know why you need to reschedule..."
                                className="text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none w-full
                                p-4"/>
                            </CardContent>
                        </CardHolder>
                        <div className="grid grid-cols-2 w-full justidy-center gap-8 col-span-2">
                            <button
                            onClick={() => {

                                router.push("../../appointments");
                            }}
                            className="text-slate-900 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 hover:scale-102
                            transition-all duration-300 cursor-pointer border border-slate-400">
                                Cancel Changes
                            </button>
                            <button
                            disabled={disabled}
                            onClick={async () => {

                                if (disabled) return;

                                setDisabled(true);

                                const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/update/${params.appointment_id}`, {

                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(
                                        {
                                            dateTime: parse(selectedTime, "h:mm a", new Date(date)).toISOString()
                                        }
                                    )
                                });

                                if (!res.ok) {

                                    console.error("Failed to Patch");
                                    return;
                                }

                                router.push("../../appointments");
                            }}
                            className="text-white px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 hover:scale-102
                            transition-all duration-300 cursor-pointer disabled:opacity-50">
                                Confirm Reschedule
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}