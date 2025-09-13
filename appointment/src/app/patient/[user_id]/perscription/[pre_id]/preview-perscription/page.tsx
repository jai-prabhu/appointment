/* eslint-disable @next/next/no-img-element */
"use client";

import { DashboardHeaderP } from "@/components/dashboard-header";
import { PrinterIcon, ArrowLeftIcon, PhoneIcon, MapPinIcon, TriangleAlertIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { PerscribtionData } from "@/lib/data";
import { format } from "date-fns";
import Footer from "@/components/footer";

export default function ViewPres () {

    const [ prescription, setPrescription ] = useState<PerscribtionData>();

    const router = useRouter();
    const params = useParams();

    const today = format(new Date(), "MMM dd, yyyy");

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${apiURL}/data/pres-query/prescribtions/${params.pre_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setPrescription(await res.json());
        }

        fetchData();
    }, [params.pre_id]);

    

    return (
        <div className="max-w-screen w-full min-h-screen bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderP>
                <button 
                onClick={() => {

                    router.push("../../dashboard");
                }}
                className="inline-flex gap-3 items-center px-4 py-2 text-slate-900 text-sm hover:bg-slate-100 hover:scale-102
                cursor-pointer group transition-all duration-300 rounded-lg">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"/>
                    Back
                </button>
            </DashboardHeaderP>
            <main className="w-full py-8 print:py-0">
                <div className="container max-w-5xl mx-auto">
                    <div className="flex w-full justify-end py-8 print:hidden">
                        <button
                        onClick={() => {
                            window.print();
                        }}
                        className="inline-flex items-center gap-3 text-white bg-teal-600 px-4 py-2 rounded-lg border
                        hover:bg-teal-500 cursor-pointer hover:scale-102 transition-all duration-300">
                            <PrinterIcon className="w-5 h-5"/>
                            Print
                        </button>
                    </div>
                    <CardHolder className="rounded-lg w-full bg-slate-50 py-4 px-12 print:px-4 print:py-2">
                        <CardHeader className="flex justify-between w-full items-center border-b border-slate-300 pt-4 pb-6">
                            <div className="flex gap-4 items-center justify-between">
                                <img
                                src="/logo.svg"
                                alt="logo"
                                className="w-12 h-auto"/>

                                <h1 className="text-slate-900 text-xl font-semibold">
                                    Schedula
                                    <p className="text-base text-slate-500 font-normal">Electronic Prescription System</p>
                                </h1>
                            </div>

                            <div className="text-end">
                                <h1 className="text-slate-900 font-bold text-xl">Prescription: <span className="font-normal">#{prescription?.id}</span></h1>
                                <p className="text-slate-500">Date: {today}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="py-8 print:py-2">
                            <div className="grid grid-cols-2 gap-8 items-start w-full justify-center pb-8 print:pb-2 print:gap-2">
                                <h1 className="text-xl text-slate-900 font-bold">Prescribing Physician</h1>
                                <h1 className="text-xl text-slate-900 font-bold">Patient Information</h1>
                                <div className="flex flex-col gap-1 justify-center">
                                    <h5 className="text-slate-900 text-lg font-bold tracking-wide">Dr. {prescription?.appointment.doc.user.firstName + " " + prescription?.appointment.doc.user.lastName}</h5>
                                    <p className="text-slate-700">{prescription?.appointment.doc.specialization}</p>
                                    <p className="inline-flex gap-2 items-center text-slate-700 text-sm">
                                        <MapPinIcon className="w-4 h-4"/>
                                        {prescription?.appointment.doc.user.location}
                                    </p>
                                    <p className="inline-flex gap-2 items-center text-slate-700 text-sm">
                                        <PhoneIcon className="w-4 h-4"/>
                                        12345 6789
                                    </p>
                                    <p className="inline-flex gap-2 items-center text-slate-700 text-sm">
                                        
                                        License: MD123456789
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1 justify-center">
                                    <h5 className="text-slate-900 text-lg font-bold tracking-wide">{prescription?.appointment.user.firstName + " " + prescription?.appointment.user.lastName}</h5>
                                    <p className="text-slate-700">DOB: 12 Feb, 1985</p>
                                    <p className="inline-flex gap-2 items-center text-slate-700 text-sm">
                                        <MapPinIcon className="w-4 h-4"/>
                                        {prescription?.appointment.user.location}
                                    </p>
                                    <p className="inline-flex gap-2 items-center text-slate-700 text-sm">
                                        <PhoneIcon className="w-4 h-4"/>
                                        12345 6789
                                    </p>
                                    <p className="inline-flex gap-2 items-center text-red-500 text-sm">
                                        <TriangleAlertIcon className="w-4 h-4 "/>
                                        Allergies: None
                                    </p>
                                </div>
                            </div>
                            <div className="py-4 bg-slate-100 rounded-lg p-4 space-y-2">
                                <h1 className="text-slate-900 font-bold text-xl">Diagnosis</h1>
                                <div className="space-y-1">
                                    <p className="text-slate-700 text-sm">{prescription?.diagnosis}</p>
                                    <p className="text-slate-700 text-sm">ICD-10: {prescription?.icd_code}</p>
                                </div>
                            </div>

                            <div className="space-y-8 my-8 print:my-2 print:space-y-2">
                                <h1 className="text-slate-900 text-xl  font-semibold">Medications Prescribed</h1>
                                {
                                    prescription?.medications.map((medication, index) => {

                                        return (
                                            <div key={index}
                                            className="flex flex-col gap-4 print:gap-1 justify-center border rounded-lg p-4 border-slate-300 border-l-teal-600">
                                                <div className="flex justify-between items-center w-full">
                                                    <h1 className="text-slate-900 font-bold text-lg">
                                                        {medication.medicine_name.name}
                                                        <p className="font-normal text-base text-slate-500">{medication.medicine_name.sub_name + " " + medication.medicine_name.scale}</p>
                                                    </h1>
                                                    <p className="font-normal text-sm text-slate-500">RX: #{index + 1}</p>
                                                </div>
                                                <div className="grid grid-cols-4 gap-4 items-center justify-center w-full">
                                                    <h1 className="text-slate-600 text-sm">
                                                        Dosage: 
                                                        <p className="text-slate-700 text-sm">{medication.dosage}</p>
                                                    </h1>

                                                    <h1 className="text-slate-600 text-sm">
                                                        Frequency: 
                                                        <p className="text-slate-700 text-sm">{medication.freq}</p>
                                                    </h1>

                                                    <h1 className="text-slate-600 text-sm">
                                                        Duration: 
                                                        <p className="text-slate-700 text-sm">{medication.duration}</p>
                                                    </h1>

                                                    <h1 className="text-slate-600 text-sm">
                                                        Quantity: 
                                                        <p className="text-slate-700 text-sm">{medication.quantity}</p>
                                                    </h1>

                                                    <h1 className="text-slate-600 text-sm col-span-4">
                                                        Instrutions for use: 
                                                        <p className="text-slate-700 text-sm">{medication.instruction}</p>
                                                    </h1>

                                                    <p className="text-slate-700 text-sm">Refills: {medication.refills}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="p-4 bg-blue-200 rounded-lg">
                                <h1 className="text-slate-900 font-bold">Additional Notes:</h1>
                                <p className="text-slate-600 pt-4">{prescription?.additional_notes}</p>
                            </div>

                            <div className="flex justify-between w-full border-y border-slate-300 mt-8 py-8">
                                <div className="flex flex-col">
                                    <p className="text-slate-500">Electronically signed by:</p>
                                    <p className="text-slate-700 font-bold">Dr. {prescription?.appointment.doc.user.firstName + " " + prescription?.appointment.doc.user.lastName}</p>
                                    <p className="text-slate-500">Date: {today}</p>
                                </div>

                                <div className="flex items-center justify-center border px-4 py-2 rounded-lg border-slate-300 bg-slate-200">
                                    <p className="text-slate-700 text-sm">Electronic<br/> Signature</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs text-slate-500 text-center mt-4">
                                <p>This Prescription is generated electronically through Schedula EHR System</p>
                                <p >For questions about this prescription, please contact prescribing physician</p>
                            </div>
                        </CardContent>
                    </CardHolder>
                </div>
            </main>
            <Footer/>
        </div>
    );
}