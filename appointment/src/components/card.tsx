import { FC } from "react";
import { LucideIcon } from "lucide-react";
 
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