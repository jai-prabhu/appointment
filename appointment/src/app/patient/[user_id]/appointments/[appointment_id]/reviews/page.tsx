"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { DashboardHeaderP } from "@/components/dashboard-header";
import { type AppointmentData, range } from "@/lib/data";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import { CardHolder, CardHeader, CardContent } from "@/components/card";
import { Avatar } from "@/components/avatar";
import { format } from "date-fns";
import Footer from "@/components/footer";

interface Rating {
    name: string;
    rating: number;
}

export default function Review() {

    const [ appoitnment, setAppointment ] = useState<AppointmentData>()
    const [ ratings, setRatings ] = useState<Rating[]>([
        {
            name: "Overall Experience",
            rating: 0
        },
        {
            name: "Communication",
            rating: 0
        },
        {
            name: "Punctuality",
            rating: 0
        },
        {
            name: "Professionalism",
            rating: 0
        },
        {
            name: "Facility Cleaniness",
            rating: 0
        }
        
    ]);

    const router = useRouter();
    const params = useParams();

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${apiURL}/data/appointment-query/appointments/${params.appointment_id}`);
            
            if (!res.ok) {

                console.error("Failed to fetch data");
                return;
            }

            setAppointment(await res.json());
        }

        fetchData();
    }, [params.appointment_id]);

    return (
        <div className="max-w-screen w-full min-h-screen bg-gradient-to-r from-slate-50 via-teal-50 to-white" style={{fontFamily: "var(--font-poppins)"}}>
            <DashboardHeaderP>
                <button
                onClick={() => {

                    router.push("../../appointments");
                }}
                className="inline-flex gap-2 items-center rounded-lg px-4 py-2 hover:bg-slate-100 
                cursor-pointer group text-slate-900 text-sm hover:scale-105 transition-all duration-300">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"/>
                    Back
                </button>
            </DashboardHeaderP>
            <main className="w-full py-8">
                <div className="container max-w-4xl mx-auto">
                    <div className="flex flex-col gap-8 justify-center">
                        <CardHolder>
                            <CardHeader className="text-slate-900 text-xl font-bold">
                                <h1>Appointment Details</h1>
                            </CardHeader>
                            <CardContent className="flex gap-2 items-center">
                                <Avatar src="/doc.png" size={16}/>
                                <h1 className="text-slate-900 font-bold">
                                    {appoitnment?.doc.user.firstName + " " + appoitnment?.doc.user.lastName}

                                    <p className="text-slate-500 font-normal text-sm">{appoitnment?.doc.specialization}</p>
                                    <p className="text-slate-500 font-normal text-sm">{appoitnment ? `${format(appoitnment.dateTime, "MMM dd, yyyy") + " at " + format(appoitnment.dateTime, "hh:mm a")}`: ``}</p>
                                </h1>
                            </CardContent>
                        </CardHolder>
                        <CardHolder>
                            <CardHeader>
                                <h1 className="text-slate-900 text-2xl font-bold">
                                    How was your experience?
                                    <p className="text-sm text-slate-500 font-normal">
                                        Your feedback help us improve our services and provide better care.
                                    </p>
                                </h1>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                {
                                    ratings.map((rating, index) => {

                                        return (
                                            <div key={index}
                                            className="space-y-4">
                                                <p className="text-slate-500">{rating.name}</p>
                                                <div className="flex gap-4 items-center justify-start">
                                                    {
                                                        range(1, 6, 1).map((rate, rating_index) => {

                                                            return (
                                                                <button key={rating_index}
                                                                onClick={
                                                                    () => {
                                                                        ratings[index].rating = rate;
                                                                        setRatings([...ratings])
                                                                    }
                                                                }
                                                                className="hover:scale-120 transition-all duration-300 
                                                                bg-transparent cursor-pointer group">
                                                                    <StarIcon className={` group-hover:text-yellow-500 group-hover:fill-yellow-500 transition-all duration-300
                                                                        ${rating.rating >= rate ? `fill-yellow-500 text-yellow-500` : `text-slate-400 fill-slate-50`}`}/>
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        );
                                    }) 
                                }
                                <div className="space-y-4">
                                    <p className="text-slate-500">Additional Comments (optional)</p>
                                    <textarea
                                    rows={5}
                                    placeholder="Share any specific feedback about your appointment..."
                                    className="text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none w-full
                                    p-4"/>
                                </div>

                                <button 
                                onClick={
                                    async () => {

                                        const res_doc = await fetch(`${apiURL}/data/doc-query/doc/update/${appoitnment ? appoitnment?.doc.user.id : 'DID'}`, {

                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                ratings: (((ratings.reduce((rating, rate) => rate.rating + rating, 0) / ratings.length) + ( appoitnment ? parseFloat(appoitnment.doc.ratings) * parseFloat(appoitnment.doc.reviews) : 0 )) / (appoitnment ? parseInt(appoitnment.doc.reviews) + 1 : 1)).toFixed(1),
                                                reviews: ( appoitnment ? parseInt(appoitnment.doc.reviews) + 1 : 0 ).toString()
                                            })
                                        });

                                        const res_apt = await fetch(`${apiURL}/data/appointment-query/appointments/update/${params.appointment_id}`, {

                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                doc: (appoitnment ? Object.assign(appoitnment.doc, {
                                                        ratings: (((ratings.reduce((rating, rate) => rate.rating + rating, 0) / ratings.length) + ( appoitnment ? parseFloat(appoitnment.doc.ratings) * parseFloat(appoitnment.doc.reviews) : 0 )) / (appoitnment ? parseInt(appoitnment.doc.reviews) + 1 : 1)).toFixed(1),
                                                        reviews: ( appoitnment ? parseInt(appoitnment.doc.reviews) + 1 : 0 ).toString()
                                                    }
                                                ) : {})
                                            })
                                        });

                                        if (!res_apt.ok && !res_doc.ok) {

                                            console.error("Failed to Patch");
                                            return;
                                        }

                                        router.push("../../appointments");
                                    }
                                }
                                className="text-white px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 hover:scale-102
                                transition-all duration-300 cursor-pointer">
                                    Submit Feedback
                                </button>
                            </CardContent>
                        </CardHolder>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}