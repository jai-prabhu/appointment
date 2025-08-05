"use client"

import { ReactNode, FC, useState, Children, cloneElement, isValidElement, ReactElement, useEffect } from "react";

export interface TabItemProps {

    id: number;
    children?: ReactNode;
    onClick?: (val?: number) => void;
}

export interface TabProbs {

    children?: ReactNode;
    onChange?: (id: number) => void;
}

export const TabHolder = ({ children, onChange }: TabProbs ) => {

    const [selectedTab, setSelectedTab] = useState(1);

    useEffect(() => {

        if (onChange) onChange(selectedTab);
    }, [selectedTab, onChange])

    return (
        <div 
        className="relative w-full bg-slate-200 rounded-lg border-4 border-slate-200">
            <div className="relative flex justify-center w-full z-10 overflow-hidden">

                {
                    Children.map(children, ( child ) => {
                        
                        if (isValidElement(child)) {

                            const validChild = child as ReactElement<TabItemProps>;

                            return (
                                cloneElement(validChild, {

                                    onClick: () => {

                                        setSelectedTab(
                                            () => {

                                                if (validChild.props.id) {

                                                    return validChild.props.id
                                                }

                                                return 1;
                                            }
                                        );

                                        
                                    }
                                })
                            )
                        }

                        return (<></>)
                    } )
                }
                
            </div>

            <div
            style={{ width: `${100 / Children.count(children)}%`, transform: `translateX(${(selectedTab - 1) * 100}%)`}}
            className={`absolute inset-0 bg-slate-50 rounded-lg
                    transition-transform duration-500`}>    
            </div>
        </div>
    );
}

export const TabItem: FC<TabItemProps> = ({ id, children, onClick }: TabItemProps) => {


    return (

         <button 
            onClick={
                () => {
                    if (onClick) {

                        onClick(id? id: 1);
                    }
                }
            }
            className={`inline-flex gap-3 justify-center text-slate-900 px-4 
                    py-2 rounded-l-lg w-full
                bg-transparent`}>
                
                {children}
        </button>

    );
}