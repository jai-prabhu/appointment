
"use client";

import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { TabHolder, TabItem } from "@/components/tab";
import { AppointmentCardP } from "@/components/card"
import { useState, useCallback, useEffect } from "react";
import { type AppointmentData } from "../../../../lib/data";
import { useRouter, useParams } from "next/navigation";
import { DashboardHeaderD } from "@/components/dashboard-header"

export default function Appointments() {

    const [selectedTab, setSelectedTab] = useState(1);
    const [appointments, setAppointments] = useState<AppointmentData[]>();

    const router = useRouter();
    const params = useParams();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/filter/doc/${params.id}`);

            if (!res.ok) {

                console.error("Failed to Fetch data");
            }

            setAppointments(await res.json());
        }

        fetchData();

        
    }, [params.id])

    console.log(appointments);

    return (
        <div className="max-w-screen w-ful bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            
            <DashboardHeaderD>
                <button 
                onClick={
                    () => {
                        router.push("dashboard");
                    }
                }
                className="inline-flex gap-3 items-center px-4 py-2 hover:bg-slate-100 rounded-lg
                hover:scale-105 transition-all duration-300 text-slate-600 text-sm group cursor-pointer">

                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300"/>

                    Back to Dashboard
                </button>
            </DashboardHeaderD>

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
                                Pending
                            </TabItem>
                            <TabItem id={2}>
                                Upcoming
                            </TabItem>
                            <TabItem id={3}>
                                Past
                            </TabItem>
                            <TabItem id={4}>
                                Cancelled
                            </TabItem>
                        </TabHolder>

                    {
                        selectedTab === 1 && (
                            <div className="flex flex-col gap-8 justify-center items-center w-full">
                                {
                                    appointments?.filter(appointment => appointment.status === 2).map(

                                        (appointment, index) => {

                                            return (
                                                <AppointmentCardP
                                                key={index}
                                                id={appointment.id}
                                                imgSrc="/man.png"
                                                name={appointment.doc.user.firstName + " " + appointment.doc.user.lastName}
                                                specialization={appointment.doc.specialization}
                                                date={appointment.date}
                                                time={appointment.time}
                                                reason={appointment.details}
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
                                    appointments?.filter(appointment => appointment.status === 1).map(

                                        (appointment, index) => {

                                            return (
                                                 <AppointmentCardP
                                                key={index}
                                                imgSrc="/man.png"
                                                id={appointment.id}
                                                name={appointment.user.firstName + " " + appointment.user.lastName}
                                                specialization={appointment.type}
                                                date={appointment.date}
                                                time={appointment.time}
                                                reason={appointment.details}
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
                                    appointments?.filter(appointment => appointment.status === 3 ).map(

                                        (appointment, index) => {

                                            return (
                                                 <AppointmentCardP
                                                key={index}
                                                id={appointment.id}
                                                imgSrc="/doc.png"
                                                name={appointment.doc.user.firstName + " " + appointment.doc.user.lastName}
                                                specialization={appointment.doc.specialization}
                                                date={appointment.date}
                                                time={appointment.time}
                                                reason={appointment.details}
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
                        selectedTab === 4 && (
                            <div className="flex flex-col gap-8 justify-center items-center w-full">
                                {
                                    appointments?.filter(appointment => appointment.status === 4).map(

                                        (appointment, index) => {

                                            return (
                                                <AppointmentCardP
                                                key={index}
                                                id={appointment.id}
                                                imgSrc="/man.png"
                                                name={appointment.doc.user.firstName + " " + appointment.doc.user.lastName}
                                                specialization={appointment.doc.specialization}
                                                date={appointment.date}
                                                time={appointment.time}
                                                reason={appointment.details}
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