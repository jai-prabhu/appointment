"use client";

import { DashboardHeaderD } from "@/components/dashboard-header";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, PhoneIcon, MailIcon, DownloadIcon, PillIcon, HomeIcon, FileTextIcon, HeartIcon, ActivityIcon, RulerIcon, WeightIcon, ThermometerIcon} from "lucide-react";
import { Avatar } from "@/components/avatar";
import { CardHolder, CardHeader, CardContent, AppointmentCardP } from "@/components/card";
import { type AppointmentData, getLastDate, PerscribtionData } from "@/lib/data";
import { TabHolder, TabItem } from "@/components/tab";
import { format } from "date-fns";
import { StatusBadge } from "@/components/badge";

export default function Record() {

    const [ appointments, setAppointments ] = useState<AppointmentData[]>([]);
    const [ selectedTab, setSelectedTab ] = useState(1);
    const [ prescriptions, setPrescriptions ] = useState<PerscribtionData[]>([]);

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/filter/${params.user_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setAppointments(await res.json());
        }

        fetchData();
    }, [params.user_id]);

    useEffect(() => {
        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/pres-query/prescribtions/filter/user/${params.user_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setPrescriptions(await res.json());
        }

        fetchData();
    }, [params.user_id]);

    const user = appointments[0] ? appointments[0].user : undefined;

    return (
        <div className="max-w-screen w-full min-h-screen bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderD>
                <button
                onClick={() => {

                    router.push("../../records");
                }}
                className="inline-flex gap-2 items-center hover:bg-slate-100 hover:scale-105 transition-all duration-300
                text-sm text-slate-900 cursor-pointer px-4 py-2 rounded-lg group">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"/>
                    Back to Patient List
                </button>
            </DashboardHeaderD>
            <main className="w-full py-8">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center gap-8 w-full">
                        <CardHolder>
                            <CardContent className="flex justify-between w-full">
                                <div className="flex gap-2 items-center">
                                    <Avatar src="/man.png" size={16}/>
                                    <div>
                                        <h1 className="text-slate-900 font-semibold text-lg">
                                            { user ? user.firstName + " " + user.lastName: ``}
                                        </h1>
                                        <p className="text-slate-500">Age: 40 years</p>
                                        <p className="inline-flex gap-2 items-center text-slate-500 text-sm">
                                            <MailIcon className="w-4 h-4"/>
                                            { user ? user.email : ``}
                                            <PhoneIcon className="w-4 h-4"/>
                                            12345 6789
                                        </p>
                                    </div>
                                </div>
                                <button className="inline-flex gap-3 items-center px-4 py-2 rounded-lg border border-slate-300 text-slate-900
                                hover:bg-slate-100 cursor-pointer hover:shadow-md shadow-slate-100 h-fit hover:scale-102 transition-all duration-300">
                                    <DownloadIcon/>
                                    Export Record
                                </button>
                            </CardContent>
                        </CardHolder>
                        <TabHolder
                        onChange={
                            (val) => {
                                setSelectedTab(val);
                            }
                        }>
                            <TabItem id={1} className={`${selectedTab === 1 ? `text-slate-900`: `text-slate-600`} flex gap-2 items-center`}>
                                <HomeIcon className="w-4 h-4"/>
                                Overview
                            </TabItem>
                            <TabItem id={2} className={`${selectedTab === 1 ? `text-slate-900`: `text-slate-600`} flex gap-2 items-center`}>
                                <PillIcon className="w-4 h-4"/>
                                Perscriptions
                            </TabItem>
                            <TabItem id={3} className={`${selectedTab === 1 ? `text-slate-900`: `text-slate-600`} flex gap-2 items-center`}>
                                <FileTextIcon className="w-4 h-4"/>
                                Appointments
                            </TabItem>
                            <TabItem id={4} className={`${selectedTab === 1 ? `text-slate-900`: `text-slate-600`} flex gap-2 items-center`}>
                                <HeartIcon className="w-4 h-4"/>
                                Vital Signs
                            </TabItem>
                        </TabHolder>
                        {
                            selectedTab === 1 && (
                                <div className="grid grid-cols-3 items-start justidy-center gap-8 w-full">
                                    <CardHolder className="w-full p-4 rounded-lg col-span-2 bg-slate-50">
                                        <CardHeader>
                                            <h1 className="text-xl text-slate-900 font-semibold">Patient Information</h1>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-2 gap-4 w-full items-center justidy-center py-4">
                                            <h5 className="text-slate-500 ">
                                                Date of Birth:
                                                <p className="font-normal text-slate-900">3/5/1985</p>
                                            </h5>

                                            <h5 className="text-slate-500 ">
                                                Total Visits:
                                                <p className="font-normal text-slate-900">{appointments.length}</p>
                                            </h5>

                                            <h5 className="text-slate-500">
                                                Last Visit:
                                                <p className="font-normal text-slate-900">{getLastDate(appointments)}</p>
                                            </h5>

                                            <h5 className="text-slate-500 ">
                                                Address:
                                                <p className="font-normal text-slate-900">{user?.location}</p>
                                            </h5>

                                            <h5 className="text-slate-500">
                                                Emergency Contact:
                                                <p className="font-normal text-slate-900">12345 6789</p>
                                            </h5>
                                        </CardContent>
                                    </CardHolder>

                                    <CardHolder>
                                        <CardHeader>
                                            <h1 className="text-slate-900 text-xl font-bold">Medical Alerts</h1>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-4 justify-center py-4">
                                            <div className="space-y-2">
                                                <h5 className="text-slate-500">Allergies:</h5>
                                                <p className="text-teal-400 text-xs border w-fit px-2 rounded-xl bg-green-100">None</p>
                                            </div>

                                            <div className="space-y-2">
                                                <h5 className="text-slate-500">Medical History</h5>
                                                <p className="w-fit text-xs text-slate-800 font-bold px-2 rounded-xl bg-slate-200">Hypertension</p>
                                            </div>

                                            <div className="flex flex-col justify-center gap-2">
                                                <h5 className="text-slate-500">Current Medications:</h5>
                                                <p className="inline-flex gap-2 items-center text-sm text-slate-700">
                                                    <PillIcon className="w-4 h-4 text-blue-600"/>
                                                    Metformin 500mg
                                                </p>
                                                <p className="inline-flex gap-2 items-center text-sm text-slate-700">
                                                    <PillIcon className="w-4 h-4 text-blue-600"/>
                                                    Lisinopril 10mg
                                                </p>
                                            </div>
                                        </CardContent>
                                    </CardHolder>
                                </div>
                            )
                        }

                        {
                            selectedTab === 2 && (
                                <CardHolder>
                                    <CardHeader>
                                        <h1 className="text-xl text-slate-900 font-bold">Perscription History</h1>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4 items-center justify-center">
                                        {
                                            prescriptions.map((prescription, index) => {

                                                return (
                                                    <div key={index}
                                                    className="flex flex-col justify-center border border-slate-300 w-full rounded-lg p-4">
                                                        <div className="flex justify-between w-full items-center">
                                                            <h1 className="text-slate-900 font-bold">New Prescribtion
                                                                <p className="font-normal text-slate-500">Date: Aug 13, 2025</p>
                                                            </h1>
                                                            <StatusBadge status={5}/>
                                                        </div>
                                                        {
                                                            prescription.medications.map((medication, index) => {

                                                                return (
                                                                    <div 
                                                                    key={index}
                                                                    className="flex justify-between items-center rounded-lg bg-slate-100 p-4 space-y-2">
                                                                        <div>
                                                                            <h1 className="text-slate-900">
                                                                                {medication.medicine_name.sub_name + " " + medication.medicine_name.scale.split(" ").slice(0, 1)}
                                                                                <p className="text-slate-500">{medication.freq + " - " + medication.duration}</p>
                                                                            </h1>

                                                                            <p className="text-slate-500">{medication.instruction}</p>
                                                                        </div>
                                                                        <PillIcon className="text-purple-600"/>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })
                                        }
                                    </CardContent>
                                </CardHolder>
                            )
                        }

                        {
                            selectedTab === 3 && (
                                <CardHolder>
                                    <CardHeader>
                                        <h1 className="text-xl text-slate-900 font-bold">Appointment History</h1>
                                    </CardHeader>
                                    <CardContent className="">
                                        {
                                            appointments.map((appointment, index) => {

                                                return (
                                                    <AppointmentCardP
                                                    key={index}
                                                    id={appointment.id}
                                                    imgSrc="/man.png"
                                                    name={ user?.firstName + " " + user?.lastName }
                                                    specialization={appointment.type}
                                                    time={format(appointment.dateTime, "hh:mm a")}
                                                    reason={appointment.details}
                                                    date={format(appointment.dateTime, "MMM dd, yyyy")}
                                                    status={appointment.status}
                                                    type={appointment.type}/>
                                                );
                                            })
                                        }
                                    </CardContent>
                                </CardHolder>
                            )
                        }

                        {
                            selectedTab === 4 && (
                                <CardHolder>
                                    <CardHeader>
                                        <h1 className="text-xl text-slate-900 font-bold">Vital Signs History</h1>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4 justify-center border border-slate-300 rounded-lg my-4 p-4">
                                        <div className="space-y-1">
                                            <h1 className="text-lg text-slate-900 font-bold">Vital Signs Assessment</h1>
                                            <p className="text-slate-500 text-sm"><span className="text-slate-900">Recorded: </span>Aug 11, 2024</p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 items-center justify-center">
                                            <div className="flex gap-2 items-center">
                                                <HeartIcon className="text-red-500"/>
                                                <h1 className="text-slate-500">Blood Pressure
                                                    <p className="text-slate-900">128/82 mmHg</p>
                                                </h1>
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <ActivityIcon className="text-blue-500"/>
                                                <h1 className="text-slate-500">Heart Rate
                                                    <p className="text-slate-900">72 Bpm</p>
                                                </h1>
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <ThermometerIcon className="text-orange-500"/>
                                                <h1 className="text-slate-500">Temperature
                                                    <p className="text-slate-900">98.6 F</p>
                                                </h1>
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <WeightIcon className="text-green-600"/>
                                                <h1 className="text-slate-500">Weight
                                                    <p className="text-slate-900">180 lbs</p>
                                                </h1>
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <RulerIcon className="text-purple-500"/>
                                                <h1 className="text-slate-500">Height
                                                    <p className="text-slate-900">70 inches</p>
                                                </h1>
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <ActivityIcon className="text-teal-500"/>
                                                <h1 className="text-slate-500">Oxygen Saturation
                                                    <p className="text-slate-900">98%</p>
                                                </h1>
                                            </div>
                                        </div>
                                    </CardContent>
                                </CardHolder>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}