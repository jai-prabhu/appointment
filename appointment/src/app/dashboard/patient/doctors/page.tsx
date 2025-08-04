/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Select, SelectItem } from "@/components/select";
import { BookCard } from "@/components/card";

export default function Doctors () {

    return (
        <div className="max-w-screen w-full "
        style={{fontFamily: "var(--font-poppins)"}}>
            <header className="sticky top-0 z-20 w-full border-b shadow-lg shadow-slate-300/30 backdrop-blur-lg
            bg-slate-50 overflow-hidden">
                <div className="container mx-auto p-4 flex gap-4 items-center">
                    <a
                    href="" 
                    className="inline-flex gap-4 items-center">
                        

                        <ArrowLeftIcon className="text-slate-900 w-5 h-5"/>
                        
                        <h3 className="text-slate-700 font-semibold">Back</h3>
                        
                    </a>

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
                        <BookCard
                        name="Dr. Sarah Johnson"
                        specialization="Cardiology"
                        rating="4.9"
                        reviews="127"
                        experience="15 years"
                        location="Downtown Medical Center"
                        dateTime="Today 2:30 PM"
                        cost="150"/>

                        <BookCard
                        name="Dr. Michael Chen"
                        specialization="General Medicine"
                        rating="4.8"
                        reviews="203"
                        experience="12 years"
                        location="City Health Clinic"
                        dateTime="Tomorrow 9:00 AM"
                        cost="120"/>

                        <BookCard
                        name="Dr. Emily Davis"
                        specialization="Dermatology"
                        rating="4.9"
                        reviews="156"
                        experience="10 years"
                        location="Skin Care Center"
                        dateTime="Dec 15 11:30 AM"
                        cost="180"/>

                        <BookCard
                        name="Dr. James Wilson"
                        specialization="Neurology"
                        rating="4.7"
                        reviews="89"
                        experience="18 years"
                        location="Brain & SPine Institue"
                        dateTime="Dec 16 3:00 PM"
                        cost="200"/>

                        <BookCard
                        name="Dr. Lisa Anderson"
                        specialization="Pediatrics"
                        rating="4.9"
                        reviews="234"
                        experience="14 years"
                        location="Children's Hospital"
                        dateTime="Dec 14 10:15 AM"
                        cost="140"/>

                        <BookCard
                        name="Dr. Robert Taylor"
                        specialization="Orthopedics"
                        rating="4.8"
                        reviews="167"
                        experience="16 years"
                        location="Sports Medicine Center"
                        dateTime="Dec 17 1:45 PM"
                        cost="190"/>
                    </div>
                </div>
            </main>
        </div>
    );
}