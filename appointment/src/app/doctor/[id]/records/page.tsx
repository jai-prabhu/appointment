"use client";

import { DashboardHeaderD } from "@/components/dashboard-header";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { SearchIcon, FilterIcon, ArrowLeftIcon } from "lucide-react";
import { type AppointmentData } from "@/lib/data";
import { Avatar } from "@/components/avatar";
import { getLastDate } from "@/lib/data";
export default function Records () {

    const [ appointments, setAppointments ] = useState<AppointmentData[]>();

    const router = useRouter();
    const params = useParams();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/filter/doc/${params.id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setAppointments(await res.json());
        }

        fetchData();
    }, [params.id]);

    const patients = [... new Set(appointments?.map((appointment) => {
        return appointment.user;
    }) )];

    console.log(patients);

    return (
        <div className="max-w-screen w-full min-h-screen bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderD>
                <button 
                onClick={
                    () => {
                        router.push("dashboard");
                    }
                }
                className="inline-flex gap-2 items-center rounded-lg px-4 py-2 hover:bg-slate-100 cursor-pointer
                hover:scale-105 transition-all duration-300 group text-slate-900 text-sm">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"/>
                    Back to Dashboard
                </button>
            </DashboardHeaderD>

            <main className="w-full py-8">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center w-full gap-8">
                        <div className="flex justify-between w-full items-center">
                            <div className="space-y-2">
                                <h1 className="text-slate-900 font-bold tracking-wide text-3xl">Patient Reports</h1>
                                <p className="text-slate-500">Select a patient to view detailed medical information</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="inline-flex items-center px-4 py-2 rounded-sm border border-slate-300 bg-white  w-full">
                                    <SearchIcon className="w-5 h-5 text-slate-400 mr-2"/>
                                    <input
                                    type="text"
                                    placeholder="Search patients..."
                                    className="placeholder-slate-400 focus:outline-none text-slate-900"/>
                                </div>
                                <button className="inline-flex gap-2 items-center px-4 py-2 border border-slate-300 rounded-sm
                                cursor-pointer hover:bg-slate-100 text-slate-900 bg-white">
                                    <FilterIcon className="w-5 h-5 text-slate-400"/>
                                    Filter
                                </button>
                            </div>
                        </div>

                        <CardHolder>
                            <CardHeader className="space-y-1">
                                <h1 className="text-slate-900 font-semibold text-2xl">Patient List</h1>
                                <p className="text-slate-500">Click on a patient to view detailed information.</p>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-4 items-center w-full">
                                {
                                    patients.map((patient, index) => {

                                        return (
                                            <div
                                            key={index}
                                            onClick={
                                                () => {
                                                    router.push(`records/${patient.id}/record`);
                                                }
                                            }
                                            className="flex justify-between items-center p-4 border border-slate-300 w-full rounded-lg
                                            hover:scale-101 transition-all duration-300 cursor-pointer">
                                                <div className="flex gap-2 items-center">
                                                    <Avatar src="/man.png" size={16}/>
                                                    <div className="">
                                                        <h1 className="text-slate-900 font-semibold text-lg">
                                                            {patient.firstName + " " + patient.lastName}
                                                        </h1>
                                                        <p className="text-slate-500 text-sm">{patient.email}</p>
                                                        <p className="text-slate-500 text-sm">Age: 40 years - Last visited: {getLastDate(appointments?.filter(appointment => appointment.user.id === patient.id))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </CardContent>
                        </CardHolder>
                    </div>
                </div>
            </main>
        </div>
    );
}