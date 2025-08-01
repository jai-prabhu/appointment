"use client"

import { useState, Children, isValidElement, cloneElement, ReactNode, FC, ReactElement} from "react";
import { ChevronDownIcon } from "lucide-react";

interface SelectItemsProbs { 

    value?: string
    className?: string;
    children?: ReactNode;
    onClick?: (val: string) => void;
}

export const SelectItem: FC<SelectItemsProbs> = ({ value, className, children, onClick}: SelectItemsProbs) => {

    return (
        <div className={className ? className : "hover:bg-slate-100 active:bg-slate-100 px-4 py-2 rounded-lg"} onClick={() => {
            if (onClick) {
                onClick(value? value : "");
            }
        }}>
            { children ? children : <></> }
        </div>
    );
}

export const Select = ({ className, children, placeholder }: {className?: string; children: ReactNode; placeholder?: string}) => {

    const [selection, setSelection] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(placeholder ? placeholder : "");

    return (
        <button 
            onKeyDown={
                () => {
                    setSelection(!selection);
                }
            }
            onBlur={
                () => {

                    setSelection(false);
                }
            }
            onClick={
                () => {
                    setSelection(!selection);
                }
            }
            className={className ? className : `relative flex ${selected === placeholder ? `text-slate-400` : `text-slate-900`} w-full border border-slate-400 px-4 py-2 rounded-lg text-start justify-between`}>
                {selected}
                <ChevronDownIcon className={`transition-all duration-500 ease-in-out text-slate-400 ${selection ? `rotate-180` : `rotate-0`}`}/>

                {selection && (
                    <div className="absolute flex flex-col items-center justify-center z-10 left-0 top-[100%] w-full bg-slate-50 shadow-xl
                    shadow-slate-400 border border-slate-300 rounded-lg mt-2">
                        <div className="p-2 text-start w-full text-slate-900">
                            {
                                Children.map(children, (child) => {

                                    if (isValidElement(child)) {

                                        const selectChild = child as ReactElement<SelectItemsProbs>;

                                        return (
                                            cloneElement(selectChild, {
                                                onClick: () => {

                                                    setSelected(
                                                        () => {
                                                            if (typeof selectChild.props.children === "string") {

                                                                return selectChild.props.children;
                                                            }
                                                            return ""
                                                        }
                                                    );
                                                }
                                            })
                                        );
                                    }

                                    return null;
                                })
                            }
                        </div>
                    </div>
                )}
        </button>
    );
}