"use client";

import { SearchIcon } from "lucide-react";

export const SearchBar = ({ className, placeholder }: {className?: string; placeholder?: string}) => {

    return (

        <div className={className ? className : `inline-flex gap-2 items-center col-span-3 border border-slate-400/50 rounded w-full px-2
            bg-white shadow-lg shadow-slate-300/30 focus:outline-none`}>
                <SearchIcon className="w-6 h-6 text-slate-400"/>
                <input
                type="text"
                placeholder={placeholder ? placeholder :"Search doctor by name or specialization"}
                className="px-4 py-2 text-slate-700 w-full focus:outline-none"/>
        </div>
    );
}