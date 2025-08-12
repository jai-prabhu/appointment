/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon, ClockIcon, CalendarIcon, StarIcon, CreditCardIcon, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { Avatar } from "@/components/avatar";
import { useParams, useRouter } from "next/navigation";
import { type DocData, type UserData, type AppointmentData } from "@/lib/data"
import { parse } from "date-fns";

interface Step {

    stepNo: number;
    title: string;
    desc: string;
}

interface PaymentMethods {

    id: number;
    name: string;
    icon: LucideIcon
}

export default function Booking () {

    const [currentStep, setCurrentStep] = useState(1);
    const [date, setDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(0);
    const [type, setType] = useState("");
    const [docsData, setDocsData] = useState<DocData>();
    const [usersData, setUsersData] = useState<UserData>()
    const [reason, setReason] = useState("");

    const router = useRouter();
    const { doc_id, user_id } = useParams();

    

    useEffect(() => {

        const fetchData = async () => {
            
            const res = await fetch(`http://localhost:5000/data/doc-query/doc/${doc_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
            }

            setDocsData(await res.json());
        }

        fetchData();
    }, [doc_id]);

    const timeSlots = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "2:00 PM", "2:30PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
    ]

    const steps: Step[] = [
        {stepNo: 1, title: "Slect Date & Time", desc: "Choose your preferred appointment slot"},
        {stepNo: 2, title: "Appointment Details", desc: "Tell us about your visit"},
        {stepNo: 3, title: "Payment & Confirmation", desc: "Review your appointment and complete payment"}
    ]

    const paymentMethods: PaymentMethods[] = [
        {id: 1, name: "Creadit Card", icon: CreditCardIcon},
        {id: 2, name: "Debit Card", icon: CreditCardIcon},
    ];

    return (
        <div className="max-w-screen w-full "
        style={{fontFamily: "var(--font-poppins)"}}>
            <header className="sticky top-0 z-20 w-full border-b shadow-lg shadow-slate-300/30 backdrop-blur-lg
            bg-slate-50 overflow-hidden">
                <div className="container mx-auto p-4 flex gap-4 items-center">
                    <button
                    onClick={ () => {
                        router.push(`/patient/${user_id}/doctors`)
                    }}
                    className="inline-flex gap-4 items-center cursor-pointer hover:bg-slate-100 rounded-lg px-4 py-2 group">
                        

                        <ArrowLeftIcon className="text-slate-900 w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300"/>
                        
                        <h3 className="text-slate-700 font-semibold">Back</h3>
                        
                    </button>

                    <img
                        src="/logo.svg"
                        alt="logo"
                        className="w-8 h-auto"/>

                    <h1 className="text-slate-900 text-2xl font-bold">Book Appointment</h1>
                </div>
            </header>

            <main className="w-full py-8 bg-gradient-to-br from-slate-50 via-teal-50 to-white">
                <div className="container max-w-6xl mx-auto">
                    <div className="flex gap-4 items-center justify-center w-full mb-8">

                        {steps.map((step, index) => {

                            return (
                                <div key={index} className="flex gap-2 items-center">
                                    <h1 className={`text-slate-90 bg-teal-600 px-4 py-4 font-bold text-xl rounded-full`}>
                                        {step.stepNo}
                                        
                                    </h1>
                                    <h1 className="text-slate-900">
                                        {step.title}
                                    </h1>
                                    {steps.length > step.stepNo && (<div className="w-24 h-[2px] bg-teal-600"></div>)}
                                </div>
                            );
                        })}
                    </div>
                    <div className="grid grid-cols-3 gap-8 w-full">
                        {
                            steps.map((step, index) => {
                                
                                return currentStep === step.stepNo && (
                                    <CardHolder key={index} className="px-6 py-8 rounded-lg bg-slate-50 col-span-2 h-fit">
                                        <CardHeader className="space-y-2">
                                            <h1 className="text-slate-900 font-semibold text-xl">{step.title}</h1>
                                            <p className="text-slate-500">{step.desc}</p>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-2">
                                            {currentStep === 1 && (<div className="space-y-2">
                                                <h1 className="text-slate-700">Select Date</h1>
                                                <input
                                                type="date"
                                                onChange={(event) => {
                                                    
                                                    setDate(event.target.value);
                                                }}
                                                className="px-4 py-2 w-full focus:outline-none border border-slate-300 rounded-lg
                                                text-slate-600"/>

                                                { date && (

                                                    <div className="space-y-2 w-full">
                                                        <h1 className="text-slate-900">Available Time Slots</h1>

                                                        <div className="grid grid-cols-4 gap-8  w-full">
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
                                                                        className={`text-slate-700 font-semibold ${selectedTime === time? `bg-teal-600 hover:bg-teal-500` : `bg-slate-50 hover:bg-slate-100`} text-sm border px-8 py-6 rounded-lg
                                                                        border-slate-300 hover:border-teal-600  cursor-pointer transition-all hover:scale-105 duration-500`}>
                                                                            {time}
                                                                        </button>
                                                                    );
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                            </div>)}

                                            {
                                                currentStep === 2 && (
                                                    <div className="space-y-2 w-full">
                                                        <h5 className="text-slate-700">Appointment Type</h5>

                                                        <div className="flex flex-col gap-2 justify-start w-full">
                                                            <p className="inline-flex gap-2 items-center text-slate-700">
                                                                <input
                                                                type="radio"
                                                                name="type"
                                                                onChange={
                                                                    (event) => {
                                                                        setType(event.target.value)
                                                                    }
                                                                }
                                                                value={"General Consultaion"}
                                                                className="accent-teal-600 cursor-pointer hover:accent-teal-500"/>
                                                                General Consultation
                                                            </p>
                                                            <p className="inline-flex gap-2 items-center text-slate-700">
                                                                <input
                                                                type="radio"
                                                                name="type"
                                                                onChange={
                                                                    (event) => {
                                                                        setType(event.target.value)
                                                                    }
                                                                }
                                                                value="Follow-up Vsit"
                                                                className="accent-teal-600 cursor-pointer hover:accent-teal-500"/>
                                                                Follow-up Visit
                                                            </p>
                                                            <p className="inline-flex gap-2 items-center text-slate-700">
                                                                <input
                                                                type="radio"
                                                                name="type"
                                                                onChange={
                                                                    (event) => {
                                                                        setType(event.target.value)
                                                                    }
                                                                }
                                                                value="Routine Check-up"
                                                                className="accent-teal-600 cursor-pointer hover:accent-teal-500"/>
                                                                Routine Check-up
                                                            </p>
                                                            <p className="inline-flex gap-2 items-center text-slate-700">
                                                                <input
                                                                type="radio"
                                                                name="type"
                                                                onChange={
                                                                    (event) => {
                                                                        setType(event.target.value)
                                                                    }
                                                                }
                                                                value="Urgent Care"
                                                                className="accent-teal-600 cursor-pointer hover:accent-teal-500"/>
                                                                Urgent Care
                                                            </p>
                                                        </div>

                                                        <h5 className="text-slate-700 pt-4">Reason for visit</h5>
                                                        <textarea
                                                        onChange={
                                                            (event) => {

                                                                setReason(event.target.value);
                                                            }
                                                        }
                                                        placeholder="Please describe your reason for the visit..."
                                                        rows={5}
                                                        className="px-4 py-2 border border-slate-300 rounded-lg w-full placeholder-slate-400
                                                        text-slate-700"/>
                                                    </div>
                                                )
                                            }

                                            {
                                                currentStep === 3 && (
                                                    <div className="space-y-8">
                                                        <div className="space-y-4 p-4 bg-slate-100 rounded-lg">
                                                            <h5 className="text-slate-700 font-semibold">Appointment Summary</h5>
                                                            <div className="flex flex-col gap-4">
                                                                <p className="inline-flex text-slate-500 item-center justify-between">
                                                                    Date: <span className="text-slate-500">{date}</span>
                                                                </p>

                                                                <p className="inline-flex text-slate-500 item-center justify-between">
                                                                    Time: <span className="text-slate-500">{selectedTime}</span>
                                                                </p>

                                                                <p className="inline-flex text-slate-500 item-center justify-between">
                                                                    Type: <span className="text-slate-500">Consultaion</span>
                                                                </p>

                                                                <p className="inline-flex text-slate-700 item-center justify-between font-semibold border-t border-slate-300 pt-4">
                                                                    Total <span className="text-slate-500">$150</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <h5 className="text-slate-900 text-sm font-semibold">Payment Method</h5>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                {
                                                                    paymentMethods.map((method, index) => {

                                                                        return (
                                                                            <button 
                                                                            key={index} 
                                                                            onClick={
                                                                                () => {
                                                                                    setPaymentMethod(method.id);
                                                                                }
                                                                            }
                                                                            className={`flex flex-col gap-4 items-center justify-center text-slate-700
                                                                            border border-slate-300 rounde-lg p-4 ${paymentMethod === method.id ? `bg-teal-600 hover:bg-teal-500` : `bg-slate-50 hover:bg-slate-100`}
                                                                            hover:border-teal-600 hover:scale-105 transition-all duration-300 rounded-lg cursor-pointer`}>
                                                                                <method.icon/>
                                                                                <p className="text-sm font-semibold">{method.name}</p>
                                                                            </button>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className="flex w-full justify-between items-center pt-4 mt-4 border-t border-slate-300">
                                                <button 
                                                onClick={
                                                    () => {

                                                        if (currentStep > 1) {setCurrentStep(currentStep - 1)};
                                                    }
                                                }
                                                className="inline-flex items-center gap-3 bg-salte-50 border border-slate-300 text-slate-900
                                                px-4 py-2 rounded-lg cursor-pointer group hover:bg-slate-100 hover:scale-105">
                                                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform furation-300"/>
                                                    Previous
                                                </button>
                                                <div className="relative group rounded-lg overflow-hidden hover:scale-105 transition-all duration-300">
                                                    <button 
                                                    onClick={
                                                        async () => {
                                                            if (currentStep < steps.length) {setCurrentStep(currentStep + 1); console.log(currentStep, steps.length) }

                                                            else if (currentStep === steps.length) {

                                                                console.log("you can't even touch me")

                                                                const userRes = await fetch(`http://localhost:5000/data/user-query/user/${user_id}`);

                                                                if (userRes.ok) {

                                                                    setUsersData(await userRes.json());
                                                                }

                                                                else {
                                                                    console.error("can't get user data");
                                                                    return;
                                                                }

                                                                if (usersData && docsData)

                                                               { const appointment: AppointmentData = {
                                                                    
                                                                    id: "",
                                                                    user: usersData,
                                                                    doc: docsData,
                                                                    dateTime: parse(selectedTime, "h:mm a", new Date(date)).toISOString(),
                                                                    status: 2,
                                                                    type: type,
                                                                    details: reason

                                                                }

                                                                const res = await fetch("http://localhost:5000/data/appointment-query/booking/create-appointment", {

                                                                    method: "POST",
                                                                    headers: {

                                                                        "Content-Type": "application/json",
                                                                    },

                                                                    body: JSON.stringify(appointment)
                                                                });

                                                                if (res.ok) {
                                                                    const data = await res.json();
                                                                    router.push(`/patient/${user_id}/booking/${doc_id}/${data.id}/confirmation`);
                                                                }
                                                                else {
                                                                    console.log("Failed to Create Data");
                                                                }}

                                                                
                                                            }

                                                            else console.log(currentStep, steps.length)
                                                        }
                                                    }
                                                    className="relative inline-flex gap-3 items-center text-slate-50 font-semibold bg-transparent
                                                    px-4 py-2 z-10 cursor-pointer">
                                                        Next
                                                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2 duration-300"/>
                                                    </button>

                                                    <div className="absolute inset-0 bg-teal-600 pointer-events-none"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400
                                                    -translate-x-[100%] transistion-all duration-300 group-hover:translate-x-0 pointer-events-none"></div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </CardHolder>
                                )
                            })
                        }
                        <CardHolder className="bg-slate-50 px-6 py-8 h-fit">
                            <CardHeader>
                                <h1 className="text-xl font-semibold text-slate-900">Doctor Information</h1>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2 items-center">
                                    <Avatar src={"/doc.png"} size={16}/>
                                    <div className="">
                                        <h5 className="text-slate-900 font-bold text-lg">{docsData?.user.firstName + " " + docsData?.user.lastName}</h5>
                                        <p className="text-slate-500 text-sm">
                                            {docsData?.specialization}
                                        </p>
                                        <p className="inline-flex gap-2 items-center text-slate-500 text-xs">
                                            <StarIcon className="w-4 h-4 text-yellow-500"/>
                                            <span className="text-sm font-bold text-slate-900">{docsData?.ratings}</span>{"("}{docsData?.reviews}{")"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="inline-flex gap-2 items-center text-slate-500 text-sm">
                                        <MapPinIcon className="w-4 h-4"/>
                                        {docsData?.user.location}
                                    </p>

                                    <p className="inline-flex gap-2 items-center text-slate-500 text-sm">
                                        <ClockIcon className="w-4 h-4"/>
                                        45 minutes consulation
                                    </p>

                                    <p className="inline-flex gap-2 items-center text-slate-500 text-sm">
                                        <CalendarIcon className="w-4 h-4"/>
                                        Available: {}
                                    </p>
                                </div>

                                <div className="flex w-full justify-between items-center border-t border-slate-300 pt-6">
                                    <p className="text-slate-500">Consultation fee</p>
                                    <h1 className="font-bold text-2xl text-teal-600">${docsData?.cost}</h1>
                                </div>
                            </CardContent>
                        </CardHolder>
                    </div>
                </div>
            </main>
        </div>
    );
}