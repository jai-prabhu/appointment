/* eslint-disable @next/next/no-img-element */
import Header from "../components/Header";
import { ArrowRightIcon } from "lucide-react";


export default function Home() {

  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-gradient-to-r from-slate-50 to-white" style={{fontFamily: 'var(--font-poppins)'}}>
      <Header/>

      <main className="flex flex-col h-full w-full">
        <div className="grid grid-cols-2 max-w-6xl mx-auto my-12 gap-12 justify items-center">
          <div className="flex flex-col gap-4">
            <div className="">
              <label className="text-xs text-teal-700 border border-teal-300 rounded-full px-2">Trusted by 10,000+ patients</label>              
            </div>
            <h1 className="flex flex-col gap-3 text-slate-900 text-6xl font-bold ">
              Book Medical Appointment <span className="text-teal-600"> Effortlessly</span>
            </h1>
            <div>
              <h3 className="text-slate-500">Schedule, manage, and track your healthcare appointments
                with our intuitive platform. Connect with healthcare providers and take
                control of your heal journey.
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a className="inline-flex gap-3 text-white bg-teal-600 rounded-lg font-semibold
              justify-center px-8 py-4 hover:bg-teal-700 transition-all duration-300 hover:scale-105"
              href="">
                <ArrowRightIcon/>
                Book Appointment
              </a>
              <a className="text-slate-900 border rounded-lg border-gray-500/30 font-semibold
              text-center p-8 py-4 transition-all hover:bg-gray-500/10 hover:scale-105"
              href="">
                Learn More
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative z-10">
              <img
              src="/Logo.png"
              alt="Logo"
              className="w-[360px] h-[600px] shadow-sm shadow-gray-500/30 rounded-2xl"/>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br blur-3xl from-teal-200/40 to-blue-200/40"></div>
          </div>
        </div>
      </main>
    </div>
  );
}