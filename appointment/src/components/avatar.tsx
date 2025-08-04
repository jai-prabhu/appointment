"use client";

import { FC } from "react";

interface AvatarProps {

    src: string;
    size: string;
}

export const Avatar: FC<AvatarProps> = ({ src, size }: AvatarProps) => {

    return (
        
        <div className={`relative border border-teal-600 rounded-full bg-[url(${src})] 
        bg-no-repeat bg-cover bg-center z-10 w-${size} h-${size} seclect-none`}>      
        </div>
    );
}