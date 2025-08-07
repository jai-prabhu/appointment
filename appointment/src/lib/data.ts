
export interface Appointments {

    upcomming_appointments: AppointmentData[];
    past_appointments: AppointmentData[];
    canceled_appointments: AppointmentData[];
}

export interface AppointmentData {

    id: string;
    user: UserData;
    doc: DocData;
    date: string;
    time: string;
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
