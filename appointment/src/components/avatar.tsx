"use client";

export const Avatar = ({ src, size }: { src: string, size: string }) => {

    return (
        
        <div className={`relative border border-teal-600 rounded-full bg-[url(${src})] 
        bg-no-repeat bg-cover bg-center z-10 w-${size} h-${size} seclect-none`}>      
        </div>
    );
}