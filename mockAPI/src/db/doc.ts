import { User } from "./users";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { getConfig, type Config,  updateLastDoc} from "../config/configuration"

export interface Doc {

    user: User;
    specialization: string;
    ratings: string;
    reviews: string;
    cost: string;
    experience: string;
}

export interface DocData {

    docs: Doc[];
}

const defaultData: DocData = {docs: []};
export const docDB = new Low<DocData>(new JSONFile<DocData>("src/data/docs.json"), defaultData);

export class Docs {

    static async init(): Promise<void> {
    
            await docDB.read()
        }
    
        static async create(data: Doc): Promise<boolean>  {
    
            if (!Docs.isExist(data)) {
    
                const config: Config = await getConfig();
    
                await updateLastDoc();
    
                data.user.id = "DID-" + config.LAST_DOC_ID;
    
                docDB?.data.docs.push(data);
    
                await docDB.write();
    
                return true;
            }
    
            return false;
        }
    
        static isExist(data: Doc): boolean {
    
            const exist = docDB.data.docs.some(doc => doc.user.email === data.user.email);
    
            return exist;
        }

        static async update(doc: Doc, data: Partial<Doc>): Promise<boolean> {
        
            if (data) {
    
                Object.assign(doc, data);
    
                await docDB.write();
    
                return true;
            }
            
            return false;
        }
}

