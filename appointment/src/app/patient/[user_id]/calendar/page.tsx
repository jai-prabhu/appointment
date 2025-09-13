"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { type AppointmentData } from "@/lib/data";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon } from "lucide-react";
import { CardHolder, CardContent } from "@/components/card";
import { DashboardHeaderP } from "@/components/dashboard-header";
import { startOfToday, addMonths, addWeeks, addDays, format, getDaysInMonth, startOfMonth, isSameDay, isSameMinute, parse } from "date-fns";
import { range } from "@/lib/data";
import "./calendar.css";

export default function Calendar() {

    const [ currentDay, setCurrentDay ] = useState<Date>(startOfToday());
    const [ viewMode, setViewMode ] = useState(0);
    const [ appointments, setAppointments] = useState<AppointmentData[]>()
    const [ appointmentID, setAppointmentID] = useState("");
    const [ appointmentUpdate, setAppointmentUpdate ] = useState(0); 

    const router = useRouter();

    const params = useParams();

    const today = startOfToday();

    const formattedDay = format(currentDay, "MMMM d, yyyy");

    const formatted7Day = format (addDays(currentDay, 7), "MMM d, yyyy");

    const daysInMonth = getDaysInMonth(currentDay);

    const days = range(1, daysInMonth + 1, 1);

    const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
        "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
    ];

    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    
    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${apiURL}/data/appointment-query/appointments/filter/${params.user_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setAppointments(await res.json());

        }

        fetchData()

    }, [params.user_id, appointmentUpdate]);

    return (
        <div className="max-w-screen w-full bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderP>
                <button
                onClick={
                    () => {
                        router.push("dashboard");
                    }
                }
                className="inline-flex items-center justify-center gap-3 text-sm text-slate-700 px-4 py-2 rounded-lg
                hover:bg-slate-100 cursor-pointer group">
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300"/>
                    Back to Dashboard
                </button>
            </DashboardHeaderP>

            <main className="w-full py-8 overflow-hidden">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-8 items-center justify-center w-full">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-4 items-center justify-center">
                                <button
                                onClick={
                                    () => {
                                        switch (viewMode) {
                                            

                                            case 0: {

                                                setCurrentDay(addMonths(currentDay, -1));
                                                break;
                                            }

                                            case 1: {

                                                setCurrentDay(addWeeks(currentDay, -1));
                                                break;
                                            }

                                            case 2: {

                                                setCurrentDay(addDays(currentDay, -1));
                                                break;
                                            }
                                        }

                                       
                                    }
                                } 
                                className="bg-white border border-slate-300 rounded-md text-slate-700 p-2
                                cursor-pointer hover:bg-slate-100 hover:scale-110 transition-all duration-300">
                                    <ChevronLeftIcon/>
                                </button>
                                <h3 className="text-slate-700 font-semibold text-xl">
                                    { viewMode !== 1 ? formattedDay : `${formattedDay} - ${formatted7Day}` }
                                </h3>
                                <button
                                 onClick={
                                    () => {
                                        switch (viewMode) {

                                            case 0: {

                                                setCurrentDay(addMonths(currentDay, 1));
                                                break;
                                            }

                                            case 1: {

                                                setCurrentDay(addWeeks(currentDay, 1));
                                                break;
                                            }

                                            case 2: {

                                                setCurrentDay(addDays(currentDay, 1));
                                                break;
                                            }
                                        }

                                        
                                    }
                                }  
                                className="bg-white border border-slate-300 rounded-md text-slate-700 p-2
                                cursor-pointer hover:bg-slate-100 hover:scale-110 transition-all duration-300">
                                    <ChevronRightIcon/>
                                </button>

                                <button
                                onClick={
                                    () => {

                                        setCurrentDay(today);
                                    }
                                } 
                                className="bg-white border border-slate-300 rounded-md text-slate-700 px-4 py-2
                                cursor-pointer hover:bg-slate-100 font-semibold hover:scale-105 transition-all duration-300">
                                    Today
                                </button>
                            </div>

                            <div className="flex gap-4 items-center justify-center">
                                <button
                                onClick={
                                    () => {
                                        setViewMode(0);
                                    }
                                } 
                                className={` border border-slate-300 rounded-md p-2 text-sm
                                cursor-pointer hover:bg-slate-100 hover:scale-110 transition-all duration-300 
                                ${viewMode === 0 ? `bg-teal-600 text-slate-50 hover:bg-teal-500` : `bg-white text-slate-700 hover:bg-slate-100`}`}>
                                    Month
                                </button>
                                <button
                                onClick={
                                    () => {
                                        setViewMode(1);
                                    }
                                }  
                                className={` border border-slate-300 rounded-md p-2 text-sm
                                cursor-pointer hover:bg-slate-100 hover:scale-110 transition-all duration-300 
                                ${viewMode === 1 ? `bg-teal-600 text-slate-50 hover:bg-teal-500` : `bg-white text-slate-700 hover:bg-slate-100`}`}>
                                    Week
                                </button>
                                <button
                                onClick={
                                    () => {
                                        setViewMode(2);
                                    }
                                }  
                                className={` border border-slate-300 rounded-md p-2 text-sm
                                cursor-pointer hover:bg-slate-100 hover:scale-110 transition-all duration-300 
                                ${viewMode === 2 ? `bg-teal-600 text-slate-50 hover:bg-teal-500` : `bg-white text-slate-700 hover:bg-slate-100`}`}>
                                    Day
                                </button>

                                <button 
                                className="inline-flex gap-3 items-center justify-centerbg-white border border-slate-300 rounded-md text-slate-700 px-4 py-2
                                cursor-pointer hover:bg-slate-100  text-sm font-semibold hover:scale-105 transition-all duration-300">
                                    <FilterIcon className="w-4 h-4"/>
                                    Filter
                                </button>
                            </div>
                        </div>

                        <CardHolder className="p-0 rounded-lg bg-slate-50 border border-slate-300">
                            <CardContent className={`grid ${viewMode === 1 ? `grid-cols-8` : `grid-cols-7`} divide-x divide-y border divide-solid w-full
                            border-slate-300 divide-slate-300`}>

                                 {
                                    viewMode === 1 && (

                                        <div className="flex min-h-[80px] justify-center p-4 last:border-r border-slate-300" >
                                                
                                        </div>
                                    )
                                }

                                {
                                    (viewMode === 0 || viewMode === 1) && weeks.map((week, index) => {

                                        return (
                                            
                                            <div key={index} className="flex min-h-[80px] justify-center p-4 last:border-r border-slate-300" >
                                                <h1 className="text-slate-600">{week}</h1>
                                            </div>
                                        )
                                    })
                                }

                                {
                                     viewMode === 0 && range(0, startOfMonth(currentDay).getDay(), 1).map((val, index) => {

                                        

                                        return (
                                            <div key={index} className="flex min-h-[120px] p-4 bg-slate-100 last:border-r border-slate-300" 
                                            >
                                                
                                            </div>
                                        )
                                    })
                                }
                            
                                {
                                     viewMode === 0 && days.map((day, index) => {

                                        return (
                                            <div
                                            onDragEnter = {
                                                (e) => {
                                                    e.preventDefault()
                                                    e.currentTarget.classList.add("drag-highlight")
                                                }
                                            }
                                            onDragOver={
                                                (e) => {
                                                    e.preventDefault()
                                                    e.currentTarget.classList.add("drag-highlight")
                                                }
                                            }
                                            onDragLeave={
                                                (e) => {

                                                    e.preventDefault();
                                                    e.currentTarget.classList.remove("drag-highlight")
                                                }
                                            } 
                                            onDrop={

                                                (e) => {

                                                    setAppointmentUpdate(appointmentUpdate + 1);
                                                    
                                                    e.preventDefault();

                                                    const patchData = async () => {

                                                        const res = await fetch(`${apiURL}/data/appointment-query/appointments/update/${appointmentID}`, {

                                                            method: "PATCH",
                                                            headers: {

                                                                "Content-Type": "application/json"
                                                            },
                                                            body: JSON.stringify({
                                                                date: addDays(startOfMonth(currentDay), day - 1).toDateString()
                                                            })
                                                        })

                                                        if (!res.ok) {

                                                            console.error("Failed");
                                                        }
                                                        
                                                    }

                                                    patchData()

                                                    

                                                    e.currentTarget.classList.remove("drag-highlight")

                                                }
                                            }
                                            key={index} className="flex gap-1 min-h-[120px] w-full p-4 last:border-r border-slate-300 hover:bg-slate-100" >
                                                <h1 className="text-slate-600">{day}</h1>
                                                <div className="flex flex-col gap-1 w-full flex-grow-0">
                                                    {
                                                    appointments?.filter(appointment => isSameDay(appointment.dateTime, addDays(startOfMonth(currentDay), day - 1))).map((appointment, index) => {

                                                        
                                                        return (
                                                            <div
                                                            draggable = {appointment.status === 1}
                                                            onDragStart={
                                                                () => {
                                                                    

                                                                    setAppointmentID(appointment.id);
                                                                }
                                                            }
                                                            
                                                            key={index}
                                                            className={`w-full px-4 py-2 rounded-lg border ${appointment.status === 1 ? `active:cursor-grabbing`: `active:cursor-not-allowed`}
                                                            ${appointment.status === 1 ? `bg-green-100 border-teal-200` : appointment.status === 2 ?
                                                             `bg-orange-100 border-orange-200` : appointment.status === 3 ?
                                                              `bg-blue-100 border-blue-200` : `bg-red-100 border-red-200`}`}>
                                                                <p className={`text-xs font-semibold
                                                                 ${appointment.status === 1 ? `text-teal-600` : appointment.status === 2 ? `text-orange-600` : appointment.status === 3 ? `text-blue-600` : `text-red-500`}`}>
                                                                    {format(appointment.dateTime, "HH:mm")}
                                                                </p>
                                                                <p className={`text-xs
                                                                 ${appointment.status === 1 ? `text-teal-600` : appointment.status === 2 ? `text-orange-600` : appointment.status === 3 ? `text-blue-600` : `text-red-500`}`}>
                                                                    {appointment.user.firstName + " " + appointment.user.lastName}
                                                                </p>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                </div>
                                            </div>
                                        );
                                    })
                                    
                                }

                               

                                {
                                    viewMode === 1 && range(0, 8 * timeSlots.length, 1).map((timeSlot, index) => {

                                        return (
                                            
                                            <div
                                            key={index} 
                                            className="flex gap-1 min-h-[120px] w-full p-4 last:border-r border-slate-300 hover:bg-slate-100" >
                                                {
                                                    timeSlot % 8 === 0 && (
                                                        <h1 className="text-slate-600">{timeSlots[timeSlot / 8]}</h1>
                                                    )

                                                    
                                                }

                                                {
                                                        appointments?.filter(appointment => isSameDay(addDays(currentDay, timeSlot % 8 - 1), appointment.dateTime) && timeSlot % 8 && isSameMinute(parse(timeSlots[Math.floor(timeSlot / 8)], "h:mm a", addDays(currentDay, timeSlot % 8 - 1)), appointment.dateTime)).map((appointment, index) => {
                                                            
                                                            return (
                                                                <div
                                                            draggable = {appointment.status === 1}
                                                            onDragStart={
                                                                () => {
                                                                    

                                                                    setAppointmentID(appointment.id);
                                                                }
                                                            }
                                                            
                                                            key={index}
                                                            className={`w-full px-4 py-2 rounded-lg border ${appointment.status === 1 ? `active:cursor-grabbing`: `active:cursor-not-allowed`}
                                                            ${appointment.status === 1 ? `bg-green-100 border-teal-200` : appointment.status === 2 ?
                                                             `bg-orange-100 border-orange-200` : appointment.status === 3 ?
                                                              `bg-blue-100 border-blue-200` : `bg-red-100 border-red-200`}`}>
                                                                <p className={`text-xs font-semibold
                                                                 ${appointment.status === 1 ? `text-teal-600` : appointment.status === 2 ? `text-orange-600` : appointment.status === 3 ? `text-blue-600` : `text-red-500`}`}>
                                                                    {format(appointment.dateTime, "HH:mm")}
                                                                </p>
                                                                <p className={`text-xs
                                                                 ${appointment.status === 1 ? `text-teal-600` : appointment.status === 2 ? `text-orange-600` : appointment.status === 3 ? `text-blue-600` : `text-red-500`}`}>
                                                                    {appointment.user.firstName + " " + appointment.user.lastName}
                                                                </p>
                                                            </div>
                                                            );
                                                        })
                                                    }
                                            </div>
                                        )
                                    })
                                }

                                {
                                    viewMode === 2 && range(0, 2, 1).map((index) => {

                                        return (
                                            <div key={index} className={`flex items-center min-h-[80px] p-4 last:border-r border-slate-300 ${index ? `col-span-6` : `justify-center`}`} >
                                                {index === 0 && (
                                                    <h1 className="text-slate-500 text-sm text-center">{format(currentDay, "dd")}
                                                        <p className="text-slate-700 text-lg font-semibold">{format(currentDay, "E")}</p>
                                                    </h1>
                                                )}

                                                {
                                                    index === 1 && (
                                                    <h1 className="text-slate-700 text-start font-semibold text-xl">
                                                        {format(currentDay, "MMMM dd, yyyy")}
                                                    </h1>
                                                    )
                                                }
                                            </div>
                                        );
                                    })
                                }

                                {
                                    viewMode === 2 && range(0, (timeSlots.length - 1) * 2 , 1).map((timeSlot, index) => {

                                       if (index % 2 === 1) {return (
                                            

                                            <div
                                            key={index} 
                                            className="flex gap-1 min-h-[120px] w-full p-4 last:border-r border-slate-300 hover:bg-slate-100 col-span-6" >
                                                

                                                {
                                                        appointments?.filter(appointment => isSameDay(currentDay, appointment.dateTime) && isSameMinute(parse(timeSlots.slice(1, )[Math.floor(index / 2)], "h:mm a", currentDay), appointment.dateTime)).map((appointment, index) => {
                                                            
                                                            return (
                                                                <div
                                                            draggable = {appointment.status === 1}
                                                            onDragStart={
                                                                () => {
                                                                    

                                                                    setAppointmentID(appointment.id);
                                                                }
                                                            }
                                                            
                                                            key={index}
                                                            className={`w-full px-4 py-2 rounded-lg border ${appointment.status === 1 ? `active:cursor-grabbing`: `active:cursor-not-allowed`}
                                                            ${appointment.status === 1 ? `bg-green-100 border-teal-200` : appointment.status === 2 ?
                                                             `bg-orange-100 border-orange-200` : appointment.status === 3 ?
                                                              `bg-blue-100 border-blue-200` : `bg-red-100 border-red-200`}`}>
                                                                <p className={`text-xs font-semibold
                                                                 ${appointment.status === 1 ? `text-teal-600` : appointment.status === 2 ? `text-orange-600` : appointment.status === 3 ? `text-blue-600` : `text-red-500`}`}>
                                                                    {format(appointment.dateTime, "HH:mm")}
                                                                </p>
                                                                <p className={`text-xs
                                                                 ${appointment.status === 1 ? `text-teal-600` : appointment.status === 2 ? `text-orange-600` : appointment.status === 3 ? `text-blue-600` : `text-red-500`}`}>
                                                                    {appointment.user.firstName + " " + appointment.user.lastName}
                                                                </p>
                                                            </div>
                                                            );
                                                        })
                                                    }
                                            </div>
                                        )}

                                        else {
                                            return (
                                            <div key={index}
                                            className="flex gap-1 min-h-[120px] w-full p-4 last:border-r border-slate-300 hover:bg-slate-100" >
                                                <p className="text-slate-600 text-sm ">
                                                    { timeSlots[timeSlot / 2] }
                                                </p>
                                            </div>
                                        );
                                        }
                                    })
                                }

                            </CardContent>
                        </CardHolder>

                        <div className="flex  gap-4 items-center items-center">
                            <p className="inline-flex items-center gap-2 text-slate-600 text-sm font-medium">
                                <span className="w-4 h-4 bg-green-200 border border-teal-300 rounded-sm"></span>
                                Confirmed
                            </p>

                            <p className="inline-flex items-center gap-2 text-slate-600 text-sm font-medium">
                                <span className="w-4 h-4 bg-orange-200 border border-orange-300 rounded-sm"></span>
                                Pending
                            </p>

                            <p className="inline-flex items-center gap-2 text-slate-600 text-sm font-medium">
                                <span className="w-4 h-4 bg-blue-200 border border-blue-300 rounded-sm"></span>
                                Completed
                            </p>

                            <p className="inline-flex items-center gap-2 text-slate-600 text-sm font-medium">
                                <span className="w-4 h-4 bg-red-200 border border-red-300 rounded-sm"></span>
                                Canceled
                            </p>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}