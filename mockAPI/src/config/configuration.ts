import { promises as fs } from 'fs';
import path from 'path';


export interface Config {
    LAST_USER_ID: number;
    LAST_DOC_ID: number;
    LAST_APT_ID: number;
}




export async function getConfig(): Promise<Config> {


    const filePath = path.resolve(path.join(__dirname, "..","config/config.json"));

    const rawData = await fs.readFile(filePath, 'utf-8');

    return await JSON.parse(rawData);
}

export async function writeConfig(data: Config): Promise<void> {

     const filePath = path.resolve(path.join(__dirname, "..","config/config.json"));
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function updateLastUser(): Promise<void> {

    const config: Config = await getConfig();

    config.LAST_USER_ID += 1;

    await writeConfig(config);
}

export async function updateLastDoc(): Promise<void> {

    const config: Config = await getConfig();

    config.LAST_DOC_ID += 1;

    await writeConfig(config);
}

export async function updateLastAPT(): Promise<void> {

    const config: Config = await getConfig();

    config.LAST_APT_ID += 1;

    await writeConfig(config);
}