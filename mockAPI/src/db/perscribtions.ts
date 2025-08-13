import { Appointment, Appointments } from "./appointment";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Config, getConfig, updateLastPRE } from "../config/configuration";


export interface Medication {

    medicine_name: Medicine;
    dosage: string;
    freq: string;
    duration: string;
    quantity: number;
    refills: number;
    instruction: string;
}

export interface Medicine {

    name: string;
    sub_name: string;
    scale: string;
}

export interface Prescribtion {

    id: string;
    appointment: Appointment
    diagnosis: string;
    icd_code: string;
    priority: string;
    medications: Medication[];
    additional_notes: string;
    created_at: string;
    updated_at: string;
}

export interface PrescribtionData {

    prescribtions: Prescribtion[];
}

const defaultData: PrescribtionData = {"prescribtions": []};
export const presDB = new Low<PrescribtionData>(new JSONFile<PrescribtionData>("src/data/prescribtions.json"), defaultData);

export class Prescribtions {

    static async init(): Promise<void> {
    
            await presDB.read()
        }
    
    static async create(data: Prescribtion): Promise<{created: boolean; id: string;}>  {

        if (data) {

            const config: Config = await getConfig();

            await updateLastPRE();

            data.id = "RXP-" + config.LAST_PRE_ID;

            data.created_at = new Date().toISOString();

            data.updated_at = new Date().toISOString();

            Appointments.update(data.appointment, {pres_id: data.id});

            presDB?.data.prescribtions.push(data);

            await presDB.write();

            return {created: true, id: data.id};
        }

        return {created: false, id: "-1"};
    }

    static async delete(data: Prescribtion): Promise<void> {

        

        await presDB.write();
    }

    static async update(prescribtion: Prescribtion, data: Partial<Prescribtion>): Promise<boolean> {

        if (data) {

            data.updated_at = new Date().toISOString();

            Object.assign(prescribtion, data);

            await presDB.write();

            return true;
        }
        
        return false;
    }

        
}
