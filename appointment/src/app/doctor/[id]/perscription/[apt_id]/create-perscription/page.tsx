"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { DashboardHeaderD } from "@/components/dashboard-header";
import { ArrowLeftIcon, UserIcon, MailIcon, PhoneIcon, MapPinIcon, FileTextIcon, PillIcon, PlusIcon, XIcon, SearchIcon, Trash2Icon, SendIcon } from "lucide-react";
import { type AppointmentData, type MedicationData, type MedicineData } from "@/lib/data";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { Select, SelectItem } from "@/components/select";
import { Avatar } from "@/components/avatar";
import Footer from "@/components/footer";

export default function CreatePrescription () {

    const [ appointment, setAppointment ] = useState<AppointmentData>();
    const [ showMedication, setShowMedication ] = useState<boolean>();
    const [ medications, setMedications ] = useState<MedicationData[]>([]);
    const [ selectedMedicine, setSelectedMedicine ] = useState<number | undefined>();
    const [ dosage, setDosage ] = useState<string>("");
    const [ freq, setFreq ] = useState<string>("");
    const [ duration, setDuration ] = useState("");
    const [ quantity, setQuentity ] = useState("");
    const [ refill, setRefill ] = useState("");
    const [ instruction, setInstruction ] = useState("");
    const [ diagnmosis, setDiagnosis ] = useState("");
    const [ priority, setPriority ]= useState("");
    const [ ICT, setICT ] = useState("");
    const [ additionalNotes, setAdditionalNotes ] = useState("");

    const router = useRouter();
    const params = useParams();

    const medicines: MedicineData[] = [
        {name: "LisinoPril", sub_name: "Lisinopril", scale: "10mg tablet"},
        {name: "Metformin", sub_name: "Metformin HCL", scale: "500mg tablet"},
        {name: "Atrovastatin", sub_name: "Atorvastatin Calcium", scale: "20mg tablet"},
        {name: "Amlodipine", sub_name: "Amlodipine Besylate", scale: "5mg tablet"},
        {name: "Omerprazole", sub_name: "Omerprazole", scale: "20mg Capsule"},
        {name: "Levothyroxine", sub_name: "Levothyroxine Sodium", scale: "50mcg tablet"},
        {name: "Albuterol", sub_name: "Albuterol Sulfate", scale: "90mcg tablet"},
        {name: "Hydrochlorothiazide", sub_name: "Hydrochlorothiazide", scale: "25mg tablet"},
    ];

    console.log(medications);

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`http://localhost:5000/data/appointment-query/appointments/${params.apt_id}`);

            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setAppointment(await res.json());
        }

        fetchData();
    }, [params.apt_id]);

    return (
        <div className="max-w-screen min-h-screen w-full bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderD>
                <button
                onClick={() => {
                    router.push("../../perscription");
                }}
                className="inline-flex gap-2 hover:bg-slate-100 px-4 py-2 text-slate-600 items-center hover:scale-105 cursor-pointer
                rounded-lg transition-all duration-300 group text-sm font-semibold">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"/>
                    Back
                </button>
            </DashboardHeaderD>

            <main className="w-full py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-3 items-start w-full gap-8">
                        <div className="flex flex-col gap-8 col-span-2 items-center justify-center w-full">
                            <CardHolder>
                                <CardHeader className="flex items-center justify-between w-full">
                                    <h1 className="inline-flex items-center gap-3 text-slate-700 text-xl font-semibold">
                                        <UserIcon/>
                                        Patient Details
                                    </h1>
                                    <button 
                                    onClick={() => {
                                        router.push("../../perscription");
                                    }}
                                    className="text-slate-700 text-sm rounded-lg border border-slate-300 px-4 py-2 font-semibold
                                    hover:bg-slate-100 hover:scale-105 cursor-pointer">
                                        Change
                                    </button>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-center gap-4 py-4">
                                    <div className="flex gap-2 items-center w-full">
                                        <Avatar src="/man.png" size={12}/>
                                        <h1 className="space-y-2 text-lg text-slate-700 font-semibold">
                                            {appointment?.user.firstName + " " + appointment?.user.lastName}
                                            <p className="text-slate-500 text-xs font-normal">
                                            Patient ID: {appointment?.user.id}
                                            </p>
                                        </h1>
                                    </div>

                                    <div className="grid grid-cols-2 item-center justify-center gap-4">
                                        <p className="inline-flex gap-2 items-center text-sm text-slate-500">
                                            <MailIcon className="w-4 h-4"/>
                                            {appointment?.user.email}
                                        </p>
                                        <p className="inline-flex gap-2 items-center text-sm text-slate-500">
                                            <PhoneIcon className="w-4 h-4"/>
                                            12345 67890
                                        </p>
                                        <p className="inline-flex gap-2 items-center text-sm text-slate-500">
                                            <MapPinIcon className="w-4 h-4"/>
                                            {appointment?.user.location}
                                        </p>
                                    </div>
                                    
                                </CardContent>
                            </CardHolder>

                            <CardHolder>
                                <CardHeader className="inline-flex gap-3 items-center">
                                    <FileTextIcon className="text-slate-600"/>
                                    <h1 className="text-2xl font-bold text-slate-600">
                                        Diagnosis & Medical Information
                                    </h1>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4 justify-center">
                                    <div className="space-y-1">
                                        <h5 className="text-slate-600 font-semibold text-sm">Primary Diagnosis</h5>
                                        <input
                                        onChange={
                                            (event) => {
                                                setDiagnosis(event.target.value);
                                            }
                                        }
                                        type="text"
                                        placeholder="Enter primary diagnosis"
                                        className="w-full placeholder-slate-400 border border-slate-300 px-4 py-2 rounded-lg 
                                        focus:outline-none text-slate-600"/>
                                    </div>

                                    <div className="space-y-1">
                                        <h5 className="text-slate-600 font-semibold text-sm">ICD-10 Code (Optional)</h5>
                                        <input
                                        onChange={
                                            (event) => {
                                                setICT(event.target.value);
                                            }
                                        }
                                        type="text"
                                        placeholder="Enter ICD-10 code"
                                        className="w-full placeholder-slate-400 border border-slate-300 px-4 py-2 rounded-lg 
                                        focus:outline-none text-slate-600"/>
                                    </div>

                                    <div className="space-y-1">
                                        <h5 className="text-slate-600 font-semibold text-sm">Priority</h5>
                                        <Select
                                        onChange={(val) => {

                                            setPriority(val);
                                        }}
                                        placeholder="select priority">
                                            <SelectItem>Routine</SelectItem>
                                            <SelectItem>Urgent</SelectItem>
                                            <SelectItem>Emergency</SelectItem>
                                        </Select>
                                    </div>
                                </CardContent>
                            </CardHolder>

                            <CardHolder>
                                <CardHeader className="flex justify-between items-center w-full">
                                    <h1 className="inline-flex gap-3 items-center text-xl text-slate-600 font-bold">
                                        <PillIcon/>
                                        Medications
                                    </h1>
                                    <button
                                    onClick={() => {

                                        setShowMedication(true);
                                    }}
                                    className="inline-flex gap-3 items-center text-slate-50 font-semibold 
                                    rounded-lg px-4 py-2 bg-teal-600 cursor-pointer hover:bg-teal-500 hover:scale-105 transition-all duration-300">
                                        <PlusIcon className="w-5 h-5"/>
                                        Add Medication
                                    </button>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-4 items-center w-full justify-center">
                                    {
                                        medications.length === 0 && (
                                            <h5 className="text-slate-400 text-xl">No Medications added yet</h5>
                                        )
                                    }
                                    {
                                        medications.map((medication, index) => {

                                            return (
                                                <div key={index}
                                                className="p-4 space-y-4 border rounded-lg border-slate-300 w-full border-l-teal-600">
                                                    <div className="flex items-center justify-between w-full">
                                                        <h5 className="text-xl text-slate-700 font-semibold">
                                                        {medication.medicine_name.name}
                                                        <p className="text-slate-400 text-sm font-normal">{medication.medicine_name.sub_name} - {medication.medicine_name.scale.split(' ').slice(0, 1)}</p>
                                                        </h5>
                                                        <button 
                                                        onClick={() => {
                                                            medications.splice(index, 1);
                                                            setMedications([...medications]);
                                                            console.log(index)
                                                        }}
                                                        className=" p-2 hover:bg-red-100 cursor-pointer rounded-lg">
                                                            <Trash2Icon className="text-red-500 w-5 h-5"/>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-3 items-center justify-center w-full gap-4 text-slate-700 font-semibold text-sm">
                                                        <p>Dosage: {medication.dosage}</p>
                                                        <p>Frequency: {medication.freq}</p>
                                                        <p>Quantity: {medication.quantity}</p>
                                                        <p className="col-span-3">Instructions: {medication.instruction}</p>
                                                        <p>Refills: {medication.refills}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </CardContent>
                            </CardHolder>

                            <CardHolder>
                                <CardHeader>
                                    <h1 className="text-xl text-slate-700 font-semibold">Additional Notes</h1>
                                </CardHeader>
                                <CardContent className="py-4">
                                    <textarea
                                    onChange={(event) => {
                                        setAdditionalNotes(event.target.value);
                                    }}
                                    rows={5}
                                    placeholder="Any additional notes for pharmacist or patient..."
                                    className="w-full border border-slate-300 focus:outline-none rounded-lg px-4 py-2 placeholder-slate-400 text-slate-700"/>
                                </CardContent>
                            </CardHolder>
                            <button 
                            onClick={async () => {


                                const res = await fetch("http://localhost:5000/data/pres-query/create-prescribtion", {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        id: "",
                                        appointment: appointment,
                                        diagnosis: diagnmosis,
                                        icd_code: ICT,
                                        priority: priority,
                                        medications: medications,
                                        additional_notes: additionalNotes
                                    })
                                });

                                if (!res.ok) {

                                    console.error("Failed to create data");
                                    return;
                                }

                                const data: { message: string; id: string } = await res.json()

                                

                                router.push(`../../perscription/preview-prescribtion/${data.id}/view-prescribtion`);
                                
                            }}
                            className="inline-flex items-center gap-2 bg-teal-600 w-full justify-center px-4 py-2
                            rounded-lg text-white bg:bg-teal-500 hover:scale-102 transition-all duration-300 cursor-pointer group
                            border shadow-sm shadow-slate-200">
                                <SendIcon className="w-5 h-5"/>
                                Cofirm Perscription
                            </button>
                        </div>
                        <div className="flex flex-col gap-8 items-center justify-center w-full">
                            <CardHolder>
                                <CardHeader>
                                    <h1 className="text-xl font-semibold text-slate-700">Prescription Summary</h1>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4 justify-center items-center w-full">
                                    <p className="inline-flex w-full justify-between text-slate-400">
                                        Patient:
                                        <span className="text-slate-700 font-semibold">{appointment?.user.firstName + " " + appointment?.user.lastName}</span>
                                    </p>
                                    <p className="inline-flex w-full justify-between text-slate-400">
                                        Total Medications:
                                        <span className="text-slate-700 font-semibold">{medications.length}</span>
                                    </p>
                                    <p className="inline-flex w-full justify-between text-slate-400">
                                        Priority:
                                        <span className="text-slate-700 font-semibold">{priority}</span>
                                    </p>
                                </CardContent>
                            </CardHolder>
                            <CardHolder>
                                <CardHeader>
                                    <h1 className="text-slate-700 font-semibold text-xl">Prescribing Doctor</h1>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2 justify-center items-center w-full">
                                    <p className="w-full text-slate-700 font-semibold">
                                        Dr. { appointment?.doc.user.firstName + " " + appointment?.doc.user.lastName }
                                    </p>
                                    <div className="w-full text-slate-400 text-sm space-y-1">
                                        <p>
                                            {appointment?.doc.specialization}
                                        </p>

                                        <p>
                                            Contact: 12345 6789
                                        </p>

                                        <p>
                                            License: MD123456789
                                        </p>
                                    </div>
                                </CardContent>
                            </CardHolder>
                        </div>
                    </div>
                </div> 
                {showMedication && (
                    <div className="fixed min-h-screen flex left-0 top-0 justify-center  min-w-screen items-center backdrop-brightness-25 z-50">
                        <div className="container max-w-4xl mx-auto">
                            <CardHolder>
                                <CardHeader className="flex justify-between w-full text-slate-700 font-semibold text-xl">
                                    <h1>Add Medication</h1>
                                    <button
                                    onClick={() => {
                                        setShowMedication(false);
                                        setSelectedMedicine(undefined);
                                    }}
                                    className="px-4 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                                        <XIcon className="w-5 h-5"/>
                                    </button>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-center w-full">
                                    <div className="space-y-1 pb-4">
                                        <h1 className="text-slate-700 font-semibold">Search Medications</h1>
                                        <div className="inline-flex  items-center border border-slate-300 w-full rounded-lg">
                                            <SearchIcon className="text-slate-400 ml-2"/>
                                            <input
                                            type="text"
                                            placeholder="Search by medication name..."
                                            className="w-full px-4 py-2 placeholder-slate-400 focus:outline-none text-slate-700"/>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 item-center justify-center py-4 w-full max-h-[25vh] overflow-auto">
                                        {
                                            medicines.map((medicine, index) => {

                                                return (
                                                    <div key={index}
                                                    onClick={() => {

                                                        setSelectedMedicine(index);
                                                    }}
                                                    className={`flex flex-col justify-center bg-gradient-to-r from-slate-50 via-teal-50/10 to-white border border-slate-300 rounded-lg p-4 w-full
                                                    hover:bg-slate-100 shadow-slate-300 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300
                                                    ${selectedMedicine === index ? `border-2 border-teal-500 border-l-slate-100 border-t-slate-100` : ``}`}>
                                                        <h1 className="text-slate-700 text-md font-semibold">{medicine.name}</h1>

                                                        <p className="text-slate-400">{medicine.sub_name}</p>

                                                        <p className="text-sm text-slate-400">{medicine.scale}</p>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>

                                    {
                                        selectedMedicine !== undefined && (
                                            <div className="flex flex-col gap-4 justify-center w-full py-4 border-t border-slate-300">
                                                <h1 className="text-slate-700 font-semibold pb-4">Selected: {medicines[selectedMedicine].name}</h1>
                                                
                                                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                                                    <div className="space-y-2">
                                                        <h1 className="text-slate-700 text-sm ">Dosage</h1>
                                                        <input
                                                        onChange={(event) => {
                                                            setDosage(event.target.value);
                                                        }}
                                                        type="text"
                                                        placeholder="eg. 1 tablet"
                                                        className="px-4 py-2 text-slate-700 placeholder-slate-300  border border-slate-300 rounded-lg w-full focus:outline-none"/>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h1 className="text-slate-700 text-sm ">Frequency</h1>
                                                        <Select 
                                                        onChange={(val) => {
                                                            setFreq(val);
                                                        }}
                                                        placeholder="Select Frequency">
                                                            <SelectItem>As needed</SelectItem>
                                                            <SelectItem>Once daily</SelectItem>
                                                            <SelectItem>Twice daily</SelectItem>
                                                            <SelectItem>Three times daily</SelectItem>
                                                            <SelectItem>Every 4 hours</SelectItem>
                                                            <SelectItem>Every 6 hours</SelectItem>
                                                            <SelectItem>Every 12 hours</SelectItem>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 items-center justify-center w-full gap-4">
                                                    <div className="space-y-2">
                                                        <h1 className="text-slate-700 text-sm ">Duration</h1>
                                                        <input
                                                        onChange={
                                                            (event) => {
                                                                setDuration(event.target.value);
                                                            }
                                                        }
                                                        type="text"
                                                        placeholder="eg. 30 days"
                                                        className="px-4 py-2 text-slate-700 placeholder-slate-300  border border-slate-300 rounded-lg w-full focus:outline-none"/>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h1 className="text-slate-700 text-sm ">Quantity</h1>
                                                        <input
                                                        onChange={(event) => {
                                                            setQuentity(event.target.value);
                                                        }}
                                                        type="text"
                                                        placeholder="eg. 30 "
                                                        className="px-4 py-2 text-slate-700 placeholder-slate-300  border border-slate-300 rounded-lg w-full focus:outline-none"/>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h1 className="text-slate-700 text-sm ">Refills</h1>
                                                        <input
                                                        onChange={
                                                            (event) => {

                                                                setRefill(event.target.value);
                                                            }
                                                        }
                                                        type="text"
                                                        placeholder="Enter maximum refills"
                                                        className="px-4 py-2 text-slate-700 placeholder-slate-300  border border-slate-300 rounded-lg w-full focus:outline-none"/>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <h1 className="text-slate-700 text-sm ">Instructions</h1>
                                                    <textarea
                                                    onChange={
                                                        (event) => {

                                                            setInstruction(event.target.value);
                                                        }
                                                    }
                                                    rows={5}
                                                    placeholder="Instructions for patient..."
                                                    className="px-4 py-2 text-slate-700 placeholder-slate-300  border border-slate-300 rounded-lg w-full focus:outline-none"/>
                                                </div>

                                                <button
                                                onClick={
                                                    () => {

                                                        setMedications([...medications, {
                                                            medicine_name: medicines[selectedMedicine],
                                                            dosage: dosage,
                                                            freq: freq,
                                                            duration: duration,
                                                            quantity: parseInt(quantity),
                                                            refills: parseInt(refill),
                                                            instruction: instruction
                                                        }])

                                                        setShowMedication(false);
                                                    }
                                                }
                                                disabled={dosage === "" || freq === "" || duration === "" || quantity === ""}
                                                className="text-slate-50 font-semibold bg-teal-600 px-4 py-2 rounded-lg 
                                                hover:bg-teal-500 hover:scale-102 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-teal-600 disabled:hover:scale-100">
                                                    Add to Perscription
                                                </button>
                                            </div>
                                        )
                                    }
                                </CardContent>
                            </CardHolder>
                        </div>
                    </div>
                )}                
            </main>

            <Footer/>
        </div>
    );
}