/* eslint-disable @next/next/no-img-element */

"use client";

import Header from "@/components/header";
import { ArrowRightIcon, CalendarIcon, ClockIcon, ShieldIcon, UsersIcon, CheckCircleIcon } from "lucide-react";
import { Card } from "../components/card";
import Footer from "../components/footer";


export default function Home() {

  return (
    <div className="max-w-screen min-h-screen bg-gradient-to-r from-slate-50 to-white" style={{fontFamily: 'var(--font-poppins)'}}>
      <Header/>

      <main className="flex flex-col h-full w-full mt-16">
        <section className="px-2">
          <div className="grid lg:grid-cols-2 w-full max-w-6xl mx-auto my-12 gap-12 items-center">
            <div className="flex flex-col gap-4">
              <div className="">
                <label className="text-xs text-teal-700 border border-teal-300 rounded-full px-2">Trusted by 10,000+ patients</label>              
              </div>
              <h1 className="text-slate-900 lg:text-6xl text-4xl font-bold ">
                Book Medical Appointment <span className="text-teal-600 leading-tight"> Effortlessly</span>
              </h1>
              <div>
                <h3 className="text-slate-500">Schedule, manage, and track your healthcare appointments
                  with our intuitive platform. Connect with healthcare providers and take
                  control of your heal journey.
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex w-full relative group overflow-hidden rounded-lg transition-transform hover:scale-105 ease-in-out">
                  <a 
                  className="relative inline-flex gap-3 text-white bg-transparent rounded-lg font-semibold
                  justify-center px-8 py-4 transition-all w-full duration-300
                  z-10"
                  href="/login">
                    
                    Book Appointment
                    <ArrowRightIcon className="group-hover:translate-x-5 transition-transform duration-300"/>
                    
                  </a>
                  <span className="absolute inset-0 bg-teal-600 rounded-lg
                  transition-transform duration-300">
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg -translate-x-[100%]
                  transition-all duration-300 w-full group-hover:translate-x-0 ease-in-out">
                  </span>
                </div>
                <div className="flex w-full relative group overflow-hidden rounded-lg transition-transform hover:scale-105 ease-in-out">
                  <a className="relative w-full text-slate-900 border rounded-lg border-gray-500/30 font-semibold
                  text-center p-8 py-4
                  z-10 flex-shrink-0"
                  href="">
                    Learn More
                  </a>
                  <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-500/10 rounded-lg -translate-x-[100%]
                  transition-all duration-300 group-hover:translate-x-0 ease-in-out">
                  </span>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative z-10">
                <img
                src="/portrait.png"
                alt="Logo"
                className="w-[360px] h-[600px]"/>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br blur-3xl from-teal-200/40 to-blue-200/40"></div>
            </div>
          </div>
        </section>
        <section id="features" className="container max-w-full rounded-xl mx-auto bg-zinc-100/10 py-20 backdrop-blur-xl px-2">
          <div className="flex flex-col items-center w-full">
            <div className="space-y-4 mb-16">
              <h2 className="text-slate-900 text-3xl lg:text-4xl font-bold text-center">Everythin You Need for Healthcare Management</h2>
              <p className="text-center text-slate-600 max-w-2xl mx-auto">
                Our comprehensive platform streamlines your healthcare experience
                from booking to follow-up.
              </p>
            </div>
            <div className="grid md:grid-cols-3 max-w-6xl gap-8 mx-auto">
              <Card CardIcon={CalendarIcon}
              iconClassName="text-teal-600 w-6 h-6"
              iconBackGroundColor="bg-teal-100"
              cardTitle="Easy Booking"
              cardDescription="Schedule appointments with your preferred
              doctors in just a few taps."/>

              <Card CardIcon={ClockIcon}
              iconClassName="w-6 h-6 text-blue-600"
              iconBackGroundColor={`bg-blue-100`}
              cardTitle="Real-time Updates"
              cardDescription="Get instant notifications about appointment
              confirmations, remainders and changes."/>

              <Card CardIcon={UsersIcon}
              iconClassName="w-6 h-6 text-purple-600"
              iconBackGroundColor="bg-purple-100"
              cardTitle="Doctor Profiles"
              cardDescription="Browse detailed profiles, specializations and 
              patient reviews to find the right care."/>

              <Card CardIcon={ShieldIcon}
              iconClassName="w-6 h-6 text-green-600"
              iconBackGroundColor="bg-green-100"
              cardTitle="Secure & Private"
              cardDescription="Your health information is protected with 
              enterprise-grade security and HIPAA compliance"/>

              <Card CardIcon={CheckCircleIcon}
              iconClassName="w-6 h-6 text-orange-600"
              iconBackGroundColor="bg-orange-100"
              cardTitle="Appointment History"
              cardDescription="Keep track of all your past and upcoming
              appointments in one organize place"/>

              <Card CardIcon={ArrowRightIcon}
              iconClassName="w-6 h-6 text-pink-600"
              iconBackGroundColor="bg-pink-100"
              cardTitle="Easy Rescheduling"
              cardDescription="Need to change your appointment? Reschedule
              or cancel with just a few clicks."/>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-slate-900 font-bold text-3xl lg:text-4xl">How It Works</h2>
              <p className="text-slate-500 text-lg">Get started with Schedula in three simple steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-slate-900 text-xl font-semibold">Creat Account</h3>
                <p className="text-slate-500">Sign up with your basic information and verify
                  your identity securely.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-slate-900 text-xl font-semibold">
                  Find Your Doctor
                </h3>
                <p className="text-slate-500">
                  Browse through our network of qualified
                  healthcare providers and choose your preferred
                  doctor.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  3
                </div>
              
                <h3 className="text-slate-900 text-xl font-semibold">
                  Book & Manage
                </h3>
                <p className="text-slate-500">
                  Schedule your appointment and manage all your
                  healthcare needs from on dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-teal-600">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="flex flex-col justify-center items-center gap-8">
              <div className="space-y-4 text-center">
                <h2 className="text-white text-4xl font-bold">Ready to Take Control of Your Health?</h2>
                <p className="text-slate-50 max-w-xl mx-auto">
                  Join thousands of patients who trust Schedula for their healthcare
                  appointment management
                </p>
                <div className="grid sm:grid-cols-2 max-w-md mx-auto gap-8">
                  <a
                  href="#"
                  className="text-slate-900 text-xl font-semibold px-4 py-2 bg-white rounded-lg">Download App</a>
                  <a
                  href=""
                  className="text-slate-50 text-xl font-semibold px-4 py-2 border border-slate-50 rounded-lg">Book Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}