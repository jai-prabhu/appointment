import { User } from "./users";
import { Doc } from "./doc";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { getConfig, type Config,  updateLastAPT} from "../config/configuration"

export interface Appointment {

    id: string;
    user: User;
    doc: Doc;
    dateTime: string;
    type:string;
    status: number;
    details: string;
}

export interface AppointmentData {

    appointments: Appointment[];
}

const defaultData: AppointmentData = {"appointments": []};
export const appointmentDB = new Low<AppointmentData>(new JSONFile<AppointmentData>("src/data/appointments.json"), defaultData);

export class Appointments {

    static async init(): Promise<void> {
    
            await appointmentDB.read()
        }
    
    static async create(data: Appointment): Promise<{created: boolean; id: string;}>  {

        if (data) {

            const config: Config = await getConfig();

            await updateLastAPT();

            data.id = "APT-" + config.LAST_APT_ID;

            appointmentDB?.data.appointments.push(data);

            await appointmentDB.write();

            return {created: true, id: data.id};
        }

        return {created: false, id: "-1"};
    }

    static async delete(data: Appointment): Promise<void> {

        data.status = 4;

        await appointmentDB.write();
    }

    static async update(appointment: Appointment, data: Partial<Appointment>): Promise<boolean> {

        if (data) {

            Object.assign(appointment, data);

            await appointmentDB.write();

            return true;
        }
        
        return false;
    }

        
}

