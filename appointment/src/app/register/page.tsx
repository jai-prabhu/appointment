/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, ArrowLeftIcon, ArrowRightIcon, StethoscopeIcon, UserIcon, ShieldIcon,
    MailIcon, LockIcon, PhoneIcon, CalendarIcon, MapPinIcon
} from "lucide-react";
import { Select, SelectItem } from "../../components/select";

export default function Register () {

    const [isDoctor, setIsDoctor] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center
        justify-center p-4" style={{fontFamily: "var(--font-poppins)"}}>
            <div className="container max-w-2xl">
                <div className="text-center mb-8">

                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <img
                        src="/Logo.svg"
                        alt="logo"
                        className="w-20 h-auto"/>
                    </div>

                    <a href="/home" className="inline-flex items-center text-slate-600
                    hover:text-teal-600 transition-colors mb-6">
                        <ArrowLeftIcon className="w-4 h-4 mr-2"/>
                        Back to Home
                    </a>
                    
                    <h1 className="text-center text-slate-900 text-2xl font-bold mb-2">Create Your Account</h1>
                    <p className=" text-center text-slate-600">Join thousands of users managing their healthcare</p>
                </div>
                <div className="flex flex-col justify-center items-center bg-slate-50 pt-20 pb-8 px-8 rounded-lg
                 shadow-md shadow-slate-300 space-y-4 shadow-xl shadow-slate-300 border-t border-slate-300">
                    <div className="relative w-full bg-slate-200 rounded-lg border-4 border-slate-200">
                        <div className="relative flex justify-center w-full z-10">
                            <button 
                                onClick={
                                    () => {
                                        setIsDoctor(false);
                                    }
                                }
                                className={`inline-flex gap-3 justify-center text-slate-900 px-4 
                                     py-2 rounded-l-lg w-full
                                    bg-transparent`}>
                                        <UserIcon/>
                                    Patient
                            </button>
                                    
                            <button
                                onClick={
                                    () => {
                                        setIsDoctor(true);
                                    }
                                }
                                className={`inline-flex gap-3 justify-center text-slate-900 px-4
                                     py-2 rounded-r-lg w-full z-10
                                    bg-transparent`}>
                                        <StethoscopeIcon/>
                                        Doctor
                            </button>
                        </div>

                        <div className={`absolute inset-0 bg-slate-50 rounded-lg w-[50%]
                             transition-transform duration-500 ${!isDoctor ? `translate-x-0` : `translate-x-[100%]`}`}>    
                        </div>
                    </div>
                    {!isDoctor && (<div className="flex flex-col w-full justify-center items-center space-y-4">
                        <div className="inline-flex items-center justify-center gap-1 text-blue-500 mt-4 text-xs
                        border rounded-full w-fit px-2 bg-blue-300/30">
                            <UserIcon className="w-4"/>
                            Patient Registeration
                        </div>

                        <div className="grid md:grid-cols-2 w-full gap-8">
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-slate-900 font-semibold">First Name</label>
                                <input
                                type="text"
                                placeholder="First Name"
                                className="border border-slate-300 rounded-lg px-4 py-2 text-slate-900
                                focus:outline-none focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-slate-900 font-semibold">Last Name</label>
                                <input
                                type="text"
                                placeholder="Last Name"
                                className="border border-slate-300 rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                        </div>

                        <div className="container space-y-2 w-full">
                            <div>
                                <label className="text-slate-900 font-semibold">Email Address</label>
                            </div>
                            <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                <MailIcon className="text-slate-400"/>
                                <input
                                type="text"
                                placeholder="example@email.com"
                                className="rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 w-full gap-4 md:gap-8">
                            <div className="space-y-2 w-full">
                                 <div>
                                    <label className="text-slate-900 font-semibold">Phone Number</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <PhoneIcon className="text-slate-400"/>
                                    <input
                                    type="text"
                                    placeholder="+91 12345 67890"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                </div>
                            </div>
                            <div className="space-y-2 w-full">
                                <div>
                                    <label className="text-slate-900 font-semibold">Date of Birth</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <CalendarIcon className="text-slate-400"/>
                                    <input
                                    type="date"
                                    placeholder="mm/dd/yyyy"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <div>
                                <label className="text-slate-900 font-semibold">Address</label>
                            </div>
                            <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                <MapPinIcon className="text-slate-400"/>
                                <input
                                type="text"
                                placeholder="123 Main St, City, State 12345"
                                className="rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 w-full gap-4 md:gap-8">
                            <div className="space-y-2 w-full">
                                <div>
                                    <label className="text-slate-900 font-semibold">Password</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <LockIcon className="text-slate-400"/>
                                    <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create Password"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                    <button
                                    onClick={
                                        () => {
                                            setShowPassword(!showPassword);
                                        }
                                    }
                                    className="cursor-pointer">
                                        {showPassword ? <EyeOffIcon className="text-slate-400/50"/> : <EyeIcon className="text-slate-400"/>}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 w-full">
                                <div>
                                    <label className="text-slate-900 font-semibold">Confirm Password</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <LockIcon className="text-slate-400"/>
                                    <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                    <button 
                                    onClick={
                                        () => {
                                            setShowConfirmPassword(!showConfirmPassword);
                                        }
                                    }
                                    className="cursor-pointer">
                                        {showConfirmPassword ? <EyeOffIcon className="text-slate-400/50"/> : <EyeIcon className="text-slate-400"/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>)}
                    {isDoctor && (<div className="flex flex-col w-full justify-center items-center space-y-4">
                        <div className="inline-flex items-center justify-center gap-1 text-teal-500 mt-4 text-xs
                        border rounded-full w-fit px-2 bg-teal-300/30">
                            <ShieldIcon className="w-4"/>
                            Doctor Registeration
                        </div>

                        <div className="grid md:grid-cols-2 w-full gap-8">
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-slate-900 font-semibold">First Name</label>
                                <input
                                type="text"
                                placeholder="First Name"
                                className="border border-slate-300 rounded-lg px-4 py-2 text-slate-900
                                focus:outline-none focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-slate-900 font-semibold">Last Name</label>
                                <input
                                type="text"
                                placeholder="Last Name"
                                className="border border-slate-300 rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                        </div>

                        <div className="container space-y-2 w-full">
                            <div>
                                <label className="text-slate-900 font-semibold">Medical Email</label>
                            </div>
                            <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                <MailIcon className="text-slate-400"/>
                                <input
                                type="text"
                                placeholder="dr.name@hospital.com"
                                className="rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 w-full gap-4 md:gap-8">
                            <div className="space-y-2 w-full">
                                 <div>
                                    <label className="text-slate-900 font-semibold">Phone Number</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <PhoneIcon className="text-slate-400"/>
                                    <input
                                    type="text"
                                    placeholder="+91 12345 67890"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                </div>
                            </div>
                            <div className="space-y-2 w-full">
                                <div>
                                    <label className="text-slate-900 font-semibold">Medical License</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    
                                    <input
                                    type="text"
                                    placeholder="MD123456789"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 w-full gap-4 md:gap-8">
                            <div className="space-y-2 w-full">
                                 <div>
                                    <label className="text-slate-900 font-semibold">Specialization</label>
                                </div>
                                <Select placeholder="Select Specialization">
                                    <SelectItem value="cardiology">Cardiology</SelectItem>
                                    <SelectItem value="dermatology">Dermatology</SelectItem>
                                    <SelectItem value="endocrinology">Endocrinology</SelectItem>
                                    <SelectItem value="family-medicine">Family Medicine</SelectItem>
                                    <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                                    <SelectItem value="neurology">Neurology</SelectItem>
                                    <SelectItem value="oncology">Oncology</SelectItem>
                                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                                </Select>
                            </div>
                            <div className="space-y-2 w-full">
                                 <div>
                                    <label className="text-slate-900 font-semibold">Experience</label>
                                </div>
                                <Select placeholder="Select Experience">
                                    <SelectItem value="1-5">1-5 years</SelectItem>
                                    <SelectItem value="6-10">6-10 years</SelectItem>
                                    <SelectItem value="11-15">10-15 years</SelectItem>
                                    <SelectItem value="16-20">15-20 years</SelectItem>
                                    <SelectItem value="20+">20+ years</SelectItem>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <div>
                                <label className="text-slate-900 font-semibold">Address</label>
                            </div>
                            <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                <MapPinIcon className="text-slate-400"/>
                                <input
                                type="text"
                                placeholder="123 Main St, City, State 12345"
                                className="rounded-lg text-slate-900 px-4 py-2
                                focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 w-full gap-4 md:gap-8">
                            <div className="space-y-2 w-full">
                                <div>
                                    <label className="text-slate-900 font-semibold">Password</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <LockIcon className="text-slate-400"/>
                                    <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create Password"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                    <button
                                    onClick={
                                        () => {
                                            setShowPassword(!showPassword);
                                        }
                                    }
                                    className="cursor-pointer">
                                        {showPassword ? <EyeOffIcon className="text-slate-400/50"/> : <EyeIcon className="text-slate-400"/>}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 w-full">
                                <div>
                                    <label className="text-slate-900 font-semibold">Confirm Password</label>
                                </div>
                                <div className="flex w-full border border-slate-300 rounded-lg items-center px-2">
                                    <LockIcon className="text-slate-400"/>
                                    <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="rounded-lg text-slate-900 px-4 py-2
                                    focus:outline-none w-full focus:shadow-xl shadow-slate-300 transition-all duration-500"/>
                                    <button 
                                    onClick={
                                        () => {
                                            setShowConfirmPassword(!showConfirmPassword);
                                        }
                                    }
                                    className="cursor-pointer">
                                        {showConfirmPassword ? <EyeOffIcon className="text-slate-400/50"/> : <EyeIcon className="text-slate-400"/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>)}
                    <p className="text-slate-700 text-start w-full group">
                            
                        <input
                        type="checkbox"
                        className="mr-2 text-teal-600"/>
                        
                            I agree to the 
                        <a href="" className="text-teal-600 group-hover:text-teal-700"> Terms of Service </a>
                        and 
                        <a href="" className="text-teal-600 group-hover:text-teal-700"> Privacy Policy </a>
                    </p>

                    <div className="relative w-full group overflow-x-hidden rounded-lg border-b border-slate-300">
                        <button className="relative inline-flex gap-3 justify-center items-center
                         text-white bg-transparent w-full p-4 rounded-lg z-10 cursor-pointer">
                            Register as {isDoctor ? 'Doctor' : 'Patient'}
                            <ArrowRightIcon className="transition-transform duration-500 group-hover:translate-x-10 group-active:translate-x-10"/>
                        </button>

                        <div className="absolute inset-0 bg-teal-600 rounded-lg"></div>

                        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 rounded-lg
                        -translate-x-[100%] transition-all duration-500 group-hover:translate-x-0 group-active:translate-x-0"></div>
                    </div>

                    <p className="text-slate-700 mt-4 pt-6 border-t border-slate-300 w-full text-center">Already have an Account? 
                        <a
                        href="/login"
                        className="text-teal-600"> Sign in here</a></p>
                </div>
                <div className="flex w-full justify-center items-center gap-2 text-center py-4">
                    <ShieldIcon className="w-4 h-4 text-slate-400"/>
                    <p className="text-slate-400 text-xs sm:text-sm">
                    
                    Your data is protected with enterprise grade security & HIPAA compilance.
                </p>
                </div>
            </div>
        </div>
    );
}