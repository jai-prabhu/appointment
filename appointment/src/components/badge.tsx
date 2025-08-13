"use client";

import { ReactNode, FC } from "react";

export interface BadgeProps {

    children: ReactNode;
    bgColor: string;
    textColor: string;
    borderColor: string
}

export const Badge: FC<BadgeProps> = ({ children, bgColor, textColor, borderColor }: BadgeProps) => {

    return (
        <span className={`text-xs px-2 ${bgColor} ${textColor} ${borderColor}
        border rounded-lg`}>
            { children }
        </span>
    );
}

export interface StatusBadgeProps {

    children?: ReactNode;
    status: number;
}

export const StatusBadge: FC<StatusBadgeProps> = ({ children, status }: StatusBadgeProps) =>  {

    return (
        <>
            {
                status === 1 && (
                    <Badge
                    bgColor="bg-green-100"
                    textColor="text-teal-600"
                    borderColor="border-teal-600">
                        {children? children: 'confirmed'}
                    </Badge>
                )
            }

             {
                status === 2 && (
                    <Badge
                    bgColor="bg-orange-100"
                    textColor="text-orange-600"
                    borderColor="border-orange-600">
                        {children? children: 'pending'}
                    </Badge>
                )
            }

             {
                status === 3 && (
                    <Badge
                    bgColor="bg-blue-100"
                    textColor="text-blue-600"
                    borderColor="border-blue-600">
                        {children? children: 'completed'}
                    </Badge>
                )
            }

             {
                status === 4 && (
                    <Badge
                    bgColor="bg-red-100"
                    textColor="text-red-600"
                    borderColor="border-red-600">
                        {children? children: 'canceled'}
                    </Badge>
                )
            }

            {
                status === 5 && (
                    <Badge
                    bgColor="bg-purple100"
                    textColor="text-purple-600"
                    borderColor="border-purple-600">
                        {children? children: 'Prescribed'}
                    </Badge>
                )
            }
        </>
    )
}