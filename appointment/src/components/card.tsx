"use client";

import { FC, ReactNode } from "react";
import { LucideIcon, CalendarIcon, ClockIcon, EyeIcon, MapPinIcon, StarIcon, ArrowRightIcon, PhoneIcon,
     CircleCheckBigIcon, CircleXIcon, CheckIcon, XIcon, RotateCwIcon, 
     PillIcon,
     PlusIcon,
     SendIcon} from "lucide-react";
import { Avatar } from "./avatar";
import { StatusBadge } from "./badge";
import { useRouter, useParams } from "next/navigation";

 
export interface CardProps {

    CardIcon: LucideIcon;
    iconClassName: string;
    cardTitle: string;
    cardDescription: string;
    iconBackGroundColor: string
}

export interface BookCardProps {

    id: string;
    name: string;
    specialization: string;
    rating: string;
    reviews: string;
    experience: string;
    location: string;
    cost: string;

}

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const Card: FC<CardProps> = ({ CardIcon, cardTitle, cardDescription, iconClassName, iconBackGroundColor }) => {

    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md shadow-slate-300
        transition-all duration-500 hover:shadow-xl">
            <div className={`w-fit ${iconBackGroundColor} rounded-lg p-2`}>
                <CardIcon className={`${iconClassName}`}/>
            </div>
            
            <div className="pace-y-4">
                <h2 className="text-xl font-bold text-slate-900">{cardTitle}</h2>
                <p className="text-slate-500 text-sm">
                    {cardDescription}
                </p>
            </div>
        </div>
    );
}

export const CardHeader = ({ className, children }: {className?: string; children?: ReactNode}) => {

    return (
        <div className={className ? className : ""}>
            {children? children : <></>}
        </div>
    );                          
}

export const CardContent = ({ children, className }: {children?: ReactNode; className?: string}) => {
    
    return (
        <div className={className ? className : "flex gap-4 items-center w-full justify-center"}>
            {children? children : <></>}
        </div>
    );
    
}

export const CardHolder = ({ children, className }: {children: ReactNode; className?: string}) => {

    return (
        <div className={`space-y-4 w-full ${className? className : `p-4 bg-slate-50 rounded-lg`} shadow-md shadow-slate-300 border-t border-slate-300`}>
            { children }
        </div>
    );
}


export const PendingSlot = ({ id, imgSrc, name, specialization, date, time, location, status }: {
    id: string;
    imgSrc: string;
    name: string;
    specialization: string;
    date: string;
    time: string;
    location?: string;
    status?: number;
}) => {

    const router = useRouter();
    
    
    return (
        <div className="w-full flex justify-between bg-slate-50 border border-slate-300 rounded-lg p-4">
            <div className="flex gap-2 items-center">
                <Avatar src={imgSrc} size={16}/>
                <div>
                    <h3 className="text-slate-900 font-bold text-xl">{name}</h3>
                    <p className="text-slate-500 text-sm">{specialization}</p>
                    <div className="flex gap-2 items-center py-1">
                        <h5 className="text-slate-500 text-sm">Requested:</h5>
                        <p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <CalendarIcon className="w-3 h-3"/>
                            {date}
                        </p>
                        <p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <ClockIcon className="w-3 h-3"/>
                            {time}
                        </p>
                        {status !== 2 && (<p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <MapPinIcon className="w-3 h-3"/>
                            {location}
                        </p>)}

                        <StatusBadge
                        status={status ? status : 1}/>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
                <button 
                     onClick={
                               () => {


                                const data = async () => {const res = await fetch(`${apiURL}/data/appointment-query/appointments/update/${id}`, {

                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            status: 1
                                        })
                                    })
                                    
                                    if (!res.ok) {

                                        console.error("Failed to fetch data")
                                        return;
                                        
                                    }
                                    
                                }

                                data();

                                setTimeout(() => {
                                    router.push(`dashboard`);
                                }, 2000)
 
                                }
                            } 
                    className="inline-flex gap-3 items-center text-slate-50 bg-teal-600 font-semibold px-4 py-2 rounded-lg
                    hover:bg-teal-500 cursor-pointer hover:scale-105 transition-all duration-300">
                        <CircleCheckBigIcon className="w-4 h-4"/>
                    Approve
                </button>
                <button
                    onClick={
                               () => {


                                const data = async () => {const res = await fetch(`${apiURL}/data/appointment-query/appointments/update/${id}`, {

                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            status: 4
                                        })
                                    })
                                    
                                    if (!res.ok) {

                                        console.error("Failed to fetch data")
                                        return;
                                        
                                    }
                                    
                                }

                                data();

                                setTimeout(() => {
                                    router.push(`dashboard`);
                                }, 2000)
 
                                }
                            } 
                    className="inline-flex items-center gap-3 bg-slate-50 text-red-400  px-4 py-2 rounded-lg
                    hover:bg-salte-100 cursor-pointer border hover:scale-105 transition-all duration-300">
                        <CircleXIcon className="w-4 h-4"/>
                    Decline
                </button>
            </div>
        </div>
    );
}


export const AppointmentSlot = ({ id, pres_id, imgSrc, name, specialization, date, time, location, status }: {
    id: string;
    pres_id: string;
    imgSrc: string;
    name: string;
    specialization: string;
    date?: string;
    time: string;
    location?: string;
    status?: number;
}) => {

    const router = useRouter();
    
    
    return (
        <div className="w-full flex justify-between bg-slate-50 border border-slate-300 rounded-lg p-4">
            <div className="flex gap-2 items-center">
                <Avatar src={imgSrc} size={16}/>
                <div>
                    <h3 className="text-slate-900 font-bold text-xl">{name}</h3>
                    <p className="text-slate-500 text-sm">{specialization}</p>
                    <div className="flex gap-2 items-center py-1">
                        {status !== 2 &&(<p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <CalendarIcon className="w-3 h-3"/>
                            {date}
                        </p>)}
                        {status !== 2 && (<p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <ClockIcon className="w-3 h-3"/>
                            {time}
                        </p>)}
                        {status !== 2 && (<p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <MapPinIcon className="w-3 h-3"/>
                            {location}
                        </p>)}

                        <StatusBadge
                        status={status ? status : 1}/>
                    </div>
                </div>
            </div>
            {status === 1 || status === 2 && (<div className="flex gap-2 items-center justify-center">
                (<a 
                    href=""
                    className="text-slate-900 bg-slate-50 font-semibold px-4 py-2 border border-slate-300 rounded-lg
                    hover:bg-slate-100">
                    {status !== 2 ? `Reschedule` : `View`}
                </a>)
                <button
                    onClick={
                        () => {
                            router.push(`appointments/${id}/cancel`);
                        }
                    }
                    className="text-slate-50 bg-teal-600 font-semibold px-4 py-2 rounded-lg
                    hover:bg-teal-500 cursor-pointer">
                    cancel
                </button>
            </div>)}
            {status === 5 && (<div className="flex gap-2 items-center justify-center">
                (<button
                    onClick={() => {

                        router.push(`perscription/${pres_id}/preview-perscription`);
                    }}
                    className="inline-flex gap-3 items-center text-white bg-teal-600 font-semibold px-4 py-2 border border-slate-300 rounded-lg
                    hover:bg-teal-500 cursor-pointer">
                        <PillIcon className="w-5 h-5"/>
                    View Prescription
                </button>)
            </div>)}
        </div>
    );
}

export const BookCard = ({
    id, name, specialization, rating, reviews, experience, location, cost
}: BookCardProps) => {

    const router = useRouter();
    const params = useParams();

    return (
        <div className="w-full space-y-4 bg-white p-4 rounded-lg border border-slate-400/50 shadow-lg shadow-slate-300
        hover:scale-105 transition-all duration-300">
            <div className="flex gap-2 items-center">
                <Avatar src="/doc.png" size={16}/>
                <div className="">
                    <h1 className="text-slate-900 text-xl font-bold">
                        {name}
                    </h1>
                    <p className="text-slate-500 text-sm">
                        {specialization}
                    </p>
                    <p className="inline-flex gap-1 items-center text-slate-500 text-sm">
                        <StarIcon className="text-yellow-500 w-4 h-4 fill-yellow-500"/>
                        <span className="text-slate-900 font-semibold text">{rating}</span>
                        {"("}{reviews} reviews{")"}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-sm text-slate-500">
                <p className="inline-flex gap-2 items-center w-full">
                    <ClockIcon className="w-4 h-4"/>
                    {experience} experienced
                </p>

                <p className="inline-flex gap-2 items-center w-full">
                    <MapPinIcon className="w-4 h-4"/>
                    {location}
                </p>

                <p className="inline-flex gap-2 items-center w-full">
                    <CalendarIcon className="w-4 h-4"/>
                    Next: {""}
                </p>
            </div>
            <div className="flex w-full justify-between items-center border-t border-slate-400/50 pt-4">
                <h1 className="text-4xl text-teal-600 font-bold">
                    ${cost} <span className="text-lg text-slate-500 font-normal">per visit</span>
                </h1>
                <div className="relative rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300">
                    <button
                    onClick={
                        () => {
                            router.push(`/patient/${params.user_id}/booking/${id}`);
                        }
                    }
                    className="relative flex gap-2 items-center text-slate-50 font-bold py-2 px-4 rounded-lg z-10 cursor-pointer">
                        <ArrowRightIcon className="text-slate-50 w-4 h-4 group-hover:translate-x-2 transition-all duration-300"/>
                        Book Now
                    </button>

                    <div className="absolute inset-0 bg-teal-600 pointer-events-none"></div>

                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400
                    -translate-x-[100%] group-hover:translate-x-0 transition-all duration-300 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
}

export interface AppointmentCardProp {

    id: string;
    pres_id: string;
    imgSrc: string;
    name: string;
    specialization: string;
    status: number;
    location: string;
    time: string;
    date: string;
    type: string
}

export interface AppointmentCardPropP {

    id: string;
    imgSrc: string;
    name: string;
    specialization: string;
    status: number;
    reason: string;
    time: string;
    date: string;
    type: string
}

export const AppointmentCard = ({id, pres_id, imgSrc, name, specialization, location, time, date, status }: AppointmentCardProp) => {

    const router = useRouter();
    

    return (
        <CardHolder className="p-4 bg-slate-50 rounded-lg hover:shadow-lg cursor-pointer">
            <CardHeader className="flex gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <div>
                        <Avatar src={imgSrc} size={16}/>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between  items-center">
                            <div className="flex gap-2 items-center">
                                
                                <div className="flex flex-col">
                                    <h1 className="inline-flex gap-3 items-center text-slate-700 font-semibold">
                                        { name }
                                        <StatusBadge
                                        status={status}/>
                                    </h1>
                                    <p className="text-sm text-slate-500">{ specialization }</p>
                                </div>
                            </div>

                            

                            

                            {
                                status === 4 && (

                                    <button className="text-slate-900 font-semibold text-sm transition-colors duration-300 cursor-pointer
                                        border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-200 ">
                                        Book Again
                                    </button>
                                )
                            }

                            
                        </div>

                        <div className="grid grid-cols-3 gap-8 justify-center items-center w-full">
                            <p className="inline-flex items-center gap-3 text-sm text-slate-500 ">
                                <CalendarIcon className="w-4 h-4"/>
                                {date}
                            </p>

                            <p className="inline-flex items-center gap-3 text-sm text-slate-500 ">
                                <ClockIcon className="w-4 h-4"/>
                                {time}
                            </p>

                            <p className="inline-flex items-center gap-3 text-sm text-slate-500 ">
                                <MapPinIcon className="w-4 h-4"/>
                                {location}
                            </p>
                        </div>
                    </div>
                </div>
                {status === 2 && (<div className="flex flex-col gap-2 items-center justify-center">
                    <button 
                    onClick={
                        () => {
                            router.push(`appointments/${id}/reschedule`);
                        }
                    }
                    className="inline-flex gap-2 text-sm items-center bg-teal-600 rounded-lg px-4 py-2 cursor-pointer text-white
                    hover:bg-teal-400 hover:shadow-md shadow-slate-300">
                        <RotateCwIcon className="w-4 h-4"/>
                        Reschedule
                    </button>
                    <button className="inline-flex gap-2 w-full justify-center text-sm items-center bg-slate-50 rounded-lg px-4 py-2 cursor-pointer text-red-500
                    border border-red-500 hover:bg-red-100 hover:shadow-md shadow-slate-300">
                        <CircleXIcon className="w-4 h-4"/>
                        Cancel
                    </button>
                </div>)}
                {status === 1 && (<div className="flex flex-col gap-2 items-center justify-center">
                    <button className="inline-flex gap-2 text-sm items-center bg-teal-600 rounded-lg px-4 py-2 cursor-pointer text-white
                    hover:bg-teal-400 hover:shadow-md shadow-slate-300">
                        <RotateCwIcon className="w-4 h-4"/>
                        Reschedule
                    </button>
                    <button className="inline-flex gap-2 w-full justify-center text-sm items-center bg-slate-50 rounded-lg px-4 py-2 cursor-pointer text-red-500
                    border border-red-500 hover:bg-red-100 hover:shadow-md shadow-slate-300">
                        <CircleXIcon className="w-4 h-4"/>
                        Cancel
                    </button>
                </div>)}
                {status === 5 && (<div className="flex flex-col gap-2 items-center justify-center">
                    <button 
                    onClick={() => {

                        router.push(`perscription/${pres_id}/preview-perscription`);
                    }}
                    className="inline-flex gap-2 text-sm items-center bg-teal-600 w-full rounded-lg px-4 py-2 cursor-pointer text-white
                    hover:bg-teal-400 hover:shadow-md shadow-slate-300">
                        <PillIcon className="w-4 h-4"/>
                        Prescription
                    </button>
                    <button className="inline-flex gap-2 text-sm items-center bg-teal-600 w-full rounded-lg px-4 py-2 cursor-pointer text-white
                    hover:bg-teal-400 hover:shadow-md shadow-slate-300">
                        <PlusIcon className="w-4 h-4"/>
                        Book Again
                    </button>
                    <button
                    onClick={
                        () => {

                            router.push(`appointments/${id}/reviews`)
                        }
                    }
                    className="inline-flex gap-2 text-sm items-center bg-slate-50 w-full  rounded-lg px-4 py-2 cursor-pointer text-slate-900
                    hover:bg-slate-100 hover:shadow-md shadow-slate-300 border border-slate-400">
                        <SendIcon className="w-4 h-4"/>
                        Give Feedback
                    </button>
                </div>)}

                {status === 3 && (<div className="flex flex-col gap-2 items-center justify-center">
                    <button className="inline-flex gap-2 text-sm items-center bg-teal-600 w-full rounded-lg px-4 py-2 cursor-pointer text-white
                    hover:bg-teal-400 hover:shadow-md shadow-slate-300">
                        <PillIcon className="w-4 h-4"/>
                        Prescription
                    </button>
                    <button className="inline-flex gap-2 text-sm items-center bg-teal-600 w-full rounded-lg px-4 py-2 cursor-pointer text-white
                    hover:bg-teal-400 hover:shadow-md shadow-slate-300">
                        <PlusIcon className="w-4 h-4"/>
                        Book Again
                    </button>
                    <button
                    onClick={
                        () => {

                            router.push(`appointments/${id}/reviews`)
                        }
                    }
                    className="inline-flex gap-2 text-sm items-center bg-slate-50 w-full  rounded-lg px-4 py-2 cursor-pointer text-slate-900
                    hover:bg-slate-100 hover:shadow-md shadow-slate-300 border border-slate-400">
                        <SendIcon className="w-4 h-4"/>
                        Give Feedback
                    </button>
                </div>)}
            </CardHeader>
        </CardHolder>
    );
}


export const AppointmentCardP = ({ id, imgSrc, name, specialization, reason, time, date, status }: AppointmentCardPropP) => {

    const router = useRouter();
    

    return (
        <CardHolder className="p-4 bg-slate-50 rounded-lg hover:shadow-lg cursor-pointer">
            <CardContent className="flex gap-2">
                <div>
                    <Avatar src={imgSrc} size={16}/>
                </div>
                <div className="space-y-4 w-full">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex gap-2 items-center">
                            
                            <div className="flex flex-col">
                                <h1 className="inline-flex gap-3 items-center text-slate-700 font-semibold">
                                    { name }
                                    <StatusBadge
                                    status={status}/>
                                </h1>
                                <p className="text-sm text-slate-500">{ specialization }</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 justify-center items-center w-full">
                        
                        <p className=" text-sm text-slate-500 font-semibold">
                            Reason: <span className="font-normal">{reason}</span>
                            
                        </p>
                        
                        <div className="flex flex-col gap-2 items-start">
                            <p className="inline-flex items-center gap-3 text-sm text-slate-500 ">
                                <CalendarIcon className="w-4 h-4"/>
                                {date}
                            </p>

                            <p className="inline-flex items-center gap-3 text-sm text-slate-500 ">
                                <ClockIcon className="w-4 h-4"/>
                                {time}
                            </p>

                            <p className="inline-flex items-center gap-3 text-sm text-slate-500 ">
                                <PhoneIcon className="w-4 h-4"/>
                                123456789
                            </p>
                        </div>
                    </div>

                </div>

                {status === 1 && (<div className="flex flex-col gap-4">

                    <button 
                    onClick={async () => {

                        const res = await fetch(`${apiURL}/data/appointment-query/appointments/update/${id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                status: 3
                            })
                        });

                        if (!res.ok) {

                            console.error("failed to Patch");
                            return;
                        }

                        router.push("appointments ")
                    }}
                    className="inline-flex items-center gap-2 w-full whitespace-nowrap text-white bg-teal-600 font-bold text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all hover:bg-teal-500 duration-300 hover:shadow-sm shadow-slate-300">
                        <CheckIcon className="text-white w-5 h-5"/>
                        Mark Complete
                    </button>

                    <button className="inline-flex items-center gap-2 w-full whitespace-nowrap text-slate-600 text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all hover:bg-slate-100 duration-300 hover:shadow-sm shadow-slate-300">
                        <EyeIcon className="w-5 h-5"/>
                        View Details
                    </button>

                    <button className="w-full whitespace-nowrap text-slate-600 text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all hover:bg-slate-100 duration-300 hover:shadow-sm shadow-slate-300">
                        Reschedule
                    </button>
                </div>)}

                {status === 2 && (<div className="flex flex-col gap-4">
                    <button className="inline-flex items-center gap-2 justify-center w-full whitespace-nowrap text-slate-600 font-semibold text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all hover:bg-slate-100 duration-300 hover:shadow-sm shadow-slate-300">
                        <EyeIcon className="w-5 h-5"/>
                        View Details
                    </button>

                    <button 
                    onClick={
                               () => {


                                const data = async () => {const res = await fetch(`${apiURL}/data/appointment-query/appointments/update/${id}`, {

                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            status: 1
                                        })
                                    })
                                    
                                    if (!res.ok) {

                                        console.error("Failed to fetch data")
                                        return;
                                        
                                    }
                                    
                                }

                                data();

                                
                                router.push(`appointments`);
                                
 
                                }
                            }
                    className="inline-flex items-center gap-2 justify-center w-full w-full whitespace-nowrap text-slate-50 bg-teal-600 text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-sm font-semibold shadow-slate-300 hover:bg-teal-500">
                        <CheckIcon className="w-5 h-5"/>
                        Confirm
                    </button>

                    <button className="inline-flex items-center gap-2 justify-center w-full w-full whitespace-nowrap text-red-500 text-sm border  px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer hover:bg-red-100 transition-all duration-300 hover:shadow-sm font-semibold shadow-slate-300">
                        <XIcon className="w-5 h-5"/>
                        Cancel
                    </button>
                </div>)}

                {status === 3 && (<div className="flex flex-col gap-4">
                    <button className="inline-flex items-center gap-2 justify-center w-full whitespace-nowrap text-slate-600 font-semibold text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-sm shadow-slate-300">
                        <EyeIcon className="w-5 h-5"/>
                        View Details
                    </button>

                    <button className="inline-flex items-center gap-2 justify-center w-full w-full whitespace-nowrap text-slate-50 bg-teal-600 text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-sm font-semibold shadow-slate-300 hover:bg-teal-500">
                        <CheckIcon className="w-5 h-5"/>
                        Book Again
                    </button>

                    <button
                    onClick={
                        () => {
                            router.push(`perscription/${id}/create-perscription`)
                        }
                    }
                    className="inline-flex items-center gap-2 justify-center w-full w-full whitespace-nowrap text-slate-50 bg-teal-600 text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-sm font-semibold shadow-slate-300 hover:bg-teal-500">
                        <PillIcon className="w-5 h-5"/>
                        Prescribe
                    </button>
                </div>)}

                {status === 5 && (<div className="flex flex-col gap-4">
                    <button className="inline-flex items-center gap-2 w-full whitespace-nowrap text-slate-600 text-sm border border-slate-300 px-4 py-2 rounded-lg
                    hover:scale-105 cursor-pointer transition-all hover:bg-slate-100 duration-300 hover:shadow-sm shadow-slate-300">
                        <EyeIcon/>
                        View Prescription
                    </button>

                </div>)}
            </CardContent>
        </CardHolder>
    );
}