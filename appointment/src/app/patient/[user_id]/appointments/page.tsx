/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeftIcon, PlusIcon, FilterIcon } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { TabHolder, TabItem } from "@/components/tab";
import { AppointmentCard } from "@/components/card"
import { useState, useCallback, useEffect } from "react";
import { type Appointments } from "../../../../components/data";

export default function Appointments() {

    const [selectedTab, setSelectedTab] = useState(1);
    const [appointments, setAppointments] = useState<Appointments>();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch("http://localhost:3001/upcomming_appointments");
            const res1 = await fetch("http://localhost:3001/past_appointments");
            const res2 = await fetch("http://localhost:3001/canceled_appointments");

            if (!res.ok) {

                console.error("Failed to Fetch data");
            }

            const appointment: Appointments = {
                upcomming_appointments: await res.json(),
                past_appointments: await res1.json(),
                canceled_appointments: await res2.json()
            } 

            setAppointments(appointment);
        }

        fetchData();

        
    }, [])

    console.log(appointments);

    return (
        <div className="max-w-screen w-ful bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <header className="sticky top-0 w-full bg-slate-50 border border-teal-600/30">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center justify-center">
                            <a 
                            href="/dashboard/patient"
                            className="inline-flex gap-4 items-center justify-center px-4 py-2 rounded-lg hover:bg-slate-100
                            hover:scale-105 transition-all duration-300 text-slate-700 font-semibold">
                                <ArrowLeftIcon className="w-4 h-4"/>
                                Back
                            </a>

                            <img
                            src="/logo.svg"
                            alt="logo"
                            className="w-12 h-auto"/>

                            <h1 className="text-slate-900 font-semibold text-2xl t">Appointments</h1>
                        </div>

                        <a 
                        href="/dashboard/patient/doctors"
                        className="inline-flex gap-3 items-center justidy-center text-salte-90 font-semibold
                        bg-teal-600 rounded-lg px-4 py-2 hover:bg-teal-500 hover:scale-105 transition-all duration-300">
                            <PlusIcon className="w-4 h-4"/>
                            Book New
                        </a>
                    </div>
                </div>
            </header>

            <main className="w-full">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-8 items-center justify-cente py-8">
                        <div className="flex gap-4 items-center w-full">
                            <SearchBar/>
                            <button className="inline-flex items-center shadow-lg shadow-slate-300/30 gap-2 text-slate-600 px-4 py-2 bg-white border border-slate-300 rounded
                            hover:bg-slate-100 cursor-pointer">
                                <FilterIcon className="w-4 h-4"/>
                                Filter
                            </button>
                        </div>

                        <TabHolder onChange={
                            useCallback((val: number) => {
                                
                                setSelectedTab(val);
                            }, [])
                        }>
                            <TabItem id={1}>
                                Upcoming (3)
                            </TabItem>
                            <TabItem id={2}>
                                Past (2)
                            </TabItem>
                            <TabItem id={3}>
                                Cancelled (1)
                            </TabItem>
                        </TabHolder>

                    {
                        selectedTab === 1 && (
                            <div className="flex flex-col gap-8 justify-center items-center w-full">
                                {
                                    appointments?.upcomming_appointments.map(

                                        (appointment, index) => {

                                            return (
                                                <AppointmentCard
                                                key={index}
                                                imgSrc={appointment.imgSrc}
                                                name={appointment.name}
                                                specialization={appointment.specialization}
                                                date={appointment.date}
                                                time={appointment.time}
                                                location={appointment.location}
                                                status={appointment.status}
                                                type={appointment.type}/>
                                            )
                                        }
                                    )
                                }
                            </div>
                        )
                    }

                    {
                        selectedTab === 2 && (
                            <div className="flex flex-col gap-8 justify-center items-center w-full">
                                {
                                    appointments?.past_appointments.map(

                                        (appointment, index) => {

                                            return (
                                                <AppointmentCard
                                                key={index}
                                                imgSrc={appointment.imgSrc}
                                                name={appointment.name}
                                                specialization={appointment.specialization}
                                                date={appointment.date}
                                                time={appointment.time}
                                                location={appointment.location}
                                                status={appointment.status}
                                                type={appointment.type}/>
                                            )
                                        }
                                    )
                                }

                            </div>
                        )
                    }

                    {
                        selectedTab === 3 && (
                            <div className="flex flex-col gap-8 justify-center items-center w-full">
                                {
                                    appointments?.canceled_appointments.map(

                                        (appointment, index) => {

                                            return (
                                                <AppointmentCard
                                                key={index}
                                                imgSrc={appointment.imgSrc}
                                                name={appointment.name}
                                                specialization={appointment.specialization}
                                                date={appointment.date}
                                                time={appointment.time}
                                                location={appointment.location}
                                                status={appointment.status}
                                                type={appointment.type}/>
                                            )
                                        }
                                    )
                                }

                            </div>
                        )
                    }


                    </div>
                </div>
            </main>
        </div>
    );
}