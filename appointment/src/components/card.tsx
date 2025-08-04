import { FC, ReactNode } from "react";
import { LucideIcon, CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Avatar } from "./avatar";
 
export interface CardProps {

    CardIcon: LucideIcon;
    iconClassName: string;
    cardTitle: string;
    cardDescription: string;
    iconBackGroundColor: string
}

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
        <div className={className ? className : "space-y-4 w-full p-4 bg-slate-50 rounded-lg shadow-md shadow-slate-300 border-t border-slate-300"}>
            { children }
        </div>
    );
}

export const AppointmentSlot = ({ imgSrc, name, specialization, date, time, location, type, status }: {
    imgSrc: string;
    name: string;
    specialization: string;
    date?: string;
    time: string;
    location?: string;
    type: number;
    status?: number;
}) => {

    return (
        <div className="w-full flex justify-between bg-slate-50 border border-slate-300 rounded-lg p-4">
            <div className="flex gap-2 items-center">
                <Avatar src={imgSrc} size="16"/>
                <div>
                    <h3 className="text-slate-900 font-bold text-xl">{name}</h3>
                    <p className="text-slate-500 text-sm">{specialization}</p>
                    <div className="flex gap-2 items-center py-1">
                        {!type &&(<p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <CalendarIcon className="w-3 h-3"/>
                            {date}
                        </p>)}
                        <p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <ClockIcon className="w-3 h-3"/>
                            {time}
                        </p>
                        {!type && (<p className="inline-flex gap-1 items-center text-xs text-slate-500">
                            <MapPinIcon className="w-3 h-3"/>
                            {location}
                        </p>)}

                        {type && (
                            <h5 className={`text-xs rounded-lg px-2 ${status === 0 ? 
                                `bg-teal-100 text-teal-600` : status === 1 ? 
                                `bg-blue-100 text-blue-600` : `bg-orange-100 text-orange-600`}`}>
                                {status === 0 ? 'confirmed' : status === 1 ? 'in-progress' : 'pending'}
                            </h5>
                        )}
                    </div>
                </div>
            </div>
            { (<div className="flex gap-2 items-center justify-center">
                <a 
                    href=""
                    className="text-slate-900 bg-slate-50 font-semibold px-4 py-2 border border-slate-300 rounded-lg
                    hover:bg-slate-100">
                    {!type ? `Reschedule` : `View`}
                </a>
                <a
                    href=""
                    className="text-slate-50 bg-teal-600 font-semibold px-4 py-2 rounded-lg
                    hover:bg-teal-500">
                    {!type ? `Join` : `Start`}
                </a>
            </div>)}
        </div>
    );
}