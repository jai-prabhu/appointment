
export interface Appointments {

    upcomming_appointments: AppointmentData[];
    past_appointments: AppointmentData[];
    canceled_appointments: AppointmentData[];
}

export interface AppointmentData {

    name: string;
    specialization: string;
    date: string;
    location: string;
    time: string;
    type: number;
    status: number;
    imgSrc: string;
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

    docPrimaryData: UserData;
    experience: string;
    specialization: string
}