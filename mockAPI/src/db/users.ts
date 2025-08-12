import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { type Config, getConfig, updateLastUser } from "../config/configuration";
import { promises as fs } from "fs";
import path from "path";

export interface User {

    id: string;
    first_name: string;
    last_name:string;
    password: string;
    location:string;
    email: string;

}

export interface Login{

    email: string;
    password: string;
}



export interface UserData {

    users: User[];
}

const defaultData: UserData = { users: []};
export const userDB = new Low<UserData>(new JSONFile<UserData>("src/data/users.json"), defaultData)


export class Users {

    static async init(): Promise<void> {

        await userDB.read()
    }

    static async create(data: User): Promise<boolean>  {

        if (!Users.isExist(data)) {

            const config: Config = await getConfig();

            await updateLastUser();

            data.id = "UID-" + config.LAST_USER_ID;

            userDB?.data.users.push(data);

            await userDB.write();

            return true;
        }

        return false;
    }

    static isExist(data: User): boolean {

        const exist = userDB.data.users.some(user => user.email === data.email);

        return exist;
    }

}