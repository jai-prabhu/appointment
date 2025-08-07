/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Select, SelectItem } from "@/components/select";
import { BookCard } from "@/components/card";
import { useState, useEffect } from "react";
import { type DocData } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function Doctors () {

    const [docsData, setDocsData] = useState<DocData[]>();

    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {

            
            const res = await fetch("http://localhost:5000/data/doc-query/doc");

            if (!res.ok) {

                console.error("Failed to fetch the data");
            }

            setDocsData(await res.json());
        }

        fetchData();
    }, []);

    return (
        <div className="max-w-screen w-full "
        style={{fontFamily: "var(--font-poppins)"}}>
            <header className="sticky top-0 z-20 w-full border-b shadow-lg shadow-slate-300/30 backdrop-blur-lg
            bg-slate-50 overflow-hidden">
                <div className="container mx-auto p-4 flex gap-4 items-center">
                    <button
                    onClick={
                        () => {
                            router.push("dashboard");
                        }
                    }
                    className="inline-flex gap-4 items-center px-4 py-2 hover:bg-slate-100 rounded-lg group cursor-pointer">
                        

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
                <div className="container mx-auto">
                    <div className="grid grid-cols-5 gap-4 w-full mb-8">
                        <div className="inline-flex gap-2 items-center col-span-3 border border-slate-400/50 rounded w-full px-2
                        bg-white shadow-lg shadow-slate-300/30 focus:outline-none">
                            <SearchIcon className="w-6 h-6 text-slate-400"/>
                            <input
                            type="text"
                            placeholder="Search doctor by name or specialization"
                            className="px-4 py-2 text-slate-700 w-full focus:outline-none"/>
                        </div>

                        <Select placeholder="Filter by Specialist" className="bg-white border border-slate-400/50 rounded
                            shadow-lg shadow-slate-300/30">
                            <SelectItem value="all-specialists">All Specialists</SelectItem>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="general-medicine">General Medicine</SelectItem>
                            <SelectItem value="dermatology">Dermatology</SelectItem> 
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="pediatrics">Pediatrics</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        </Select>
                        
                        <Select placeholder="By Rating" className="bg-white border border-slate-400/50 rounded
                            shadow-lg shadow-slate-300/30">
                            <SelectItem value="all-specialists">Highest Rated</SelectItem>
                            <SelectItem value="cardiology">Price: High to Low</SelectItem>
                            <SelectItem value="general-medicine">Price: Low to High</SelectItem>
                            <SelectItem value="dermatology">Next Available</SelectItem> 
                        </Select>

                    </div>

                    <h3 className="text-slate-500 text-semibold text-">6 doctors found</h3>

                    <div className="grid grid-cols-3 gap-4 my-8">
                        {
                            docsData?.map(
                                (data, index) => {

                                    return (
                                        <BookCard
                                        key={index}
                                        id={data.user.id? data.user.id : "-1"}
                                        name={data.user.firstName + " " + data.user.lastName}
                                        specialization={data.specialization}
                                        rating={data.ratings}
                                        reviews={data.reviews}
                                        experience={data.experience}
                                        location={data.user.location}
                                        cost={data.cost}/>
                                    );
                                }
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}