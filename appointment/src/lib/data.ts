import { max, isSameDay, format } from "date-fns";
export interface Appointments {

    upcomming_appointments: AppointmentData[];
    past_appointments: AppointmentData[];
    canceled_appointments: AppointmentData[];
}

export interface AppointmentData {

    id: string;
    user: UserData;
    doc: DocData;
    dateTime: string;
    type: string;
    status: number;
    details: string;
}

export interface BookingData {

    id: number;
    name: string;
    specialization: string;
    rating: string;
    reviews: string;
    experience: string;
    location: string;
    dateTime: string;
    imgSrc: string;
    cost: string;

}

export interface UserData {

    id?: string;
    firstName: string;
    lastName: string;
    password: string;
    location: string;
    email: string;
}

export interface DocData {

    user: UserData;
    experience: string;
    specialization: string;
    ratings: string;
    reviews: string;
    cost: string;
}

export const range = (start: number, end: number, step: number) : number [] => {

    const rangeN = [];

    for (let i = start; i < end; i += step) {

        rangeN.push(i);
    }

    return rangeN;
}

export interface MedicationData {

    name: MedicineData;
    dosage: string;
    freq: string;
    duration: number;
    quantity: number;
    refills: number;
    instruction: string;
}

export interface MedicineData {

    name: string;
    subName: string;
    scale: string;
}

export const getLastDate = (appointments?: AppointmentData[]) => {

    if (appointments) {

        const dates = appointments.map((appointment) => {

            return new Date(appointment.dateTime);
        })

        const appointment = appointments.find(appointment => isSameDay(appointment.dateTime, max(dates)));

        return appointment ? format(appointment.dateTime, "MMM dd, yyyy") : undefined;
    }

    return undefined;
}
