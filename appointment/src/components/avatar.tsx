"use client";

import { FC } from "react";

interface AvatarProps {

    src: string;
    size: number;
}

export const Avatar: FC<AvatarProps> = ({ src, size }: AvatarProps) => {

    return (
        
        <div 
        style={{width: `${size / 4}rem`, height:`${size / 4}rem`, backgroundImage: `url(${src})`}}
        className={`relative border border-teal-600 rounded-full
        bg-no-repeat bg-cover bg-center z-10 seclect-none`}>      
        </div>
    );
}