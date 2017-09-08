import { RestClient } from './restClient';
import { AxiosResponse } from 'axios';
/* Base SObject */

export class SObjectAttributes {
    public type: string;
    public sfType: string; // SF apex name
}

export abstract class SObject {
    constructor(type: string, sfType: string) {

        this.attributes = new SObjectAttributes();
        this.attributes.type = type;
        this.attributes.sfType = sfType;
    }
    public id: string | undefined;
    public attributes: SObjectAttributes;
}


export interface DMLResponse {
    id: string;
    errors: any[];
    success: boolean;
}

export class SObjectClient extends SObject {

    constructor(type: string, sfType: string) {
        super(type, sfType);
    }
    public static async query<T extends SObjectClient>(type: { new(): T; }, query: string): Promise<T[]> {
        const data = await RestClient.query<T>(type, query);
        return data.records;
    }
    public async insert(): Promise<DMLResponse> {
        try {
            const response = await this.generateCall(`/sobjects/${this.attributes.type}/`, this)
            return response.data
        } catch (error) {
            console.log(error.response.data)
            return error
        }
    }


    public async update(): Promise<DMLResponse> {

        if (this.id == null) {
            throw 'Must have Id to update!';
        }
        let data = Object.assign({}, this);
        data.id = undefined;
        try {
            const response = await this.generateCall(`/sobjects/${this.attributes.type}/${this.id}?_HttpMethod=PATCH`, data)
            return response.data
        } catch (error) {
            console.log(error.response.data)
            return error
        }
    }
    public generateCall(path: string, data: SObject): Promise<AxiosResponse> {
        return RestClient.Instance.request.post(path, data);
    }

}


/* Concrete SObject Objects */

//these could be generated via the meta-data api very easily
//  Could also use a Mapper patterns to get rid of __c

export class Account extends SObjectClient {
    constructor() {
        super('Account', 'Account');
    }
    name: string;
    website: string;
    active__c?: string;
    public static async getAccounts(): Promise<Account[]> {
        return await SObjectClient.query<Account>(Account, 'SELECT id, name, website, active__c FROM Account ORDER BY Name LIMIT 10')
    }
}
export class Task extends SObjectClient {
    constructor(){
        super('Task', 'Task');
    }
    id: string;
    description: string;
    status: string;
    public static async getTasks(): Promise<Task[]> {
        return await SObjectClient.query<Task>(Task, 'Select id, description, status From Task Limit 100');
    }
}

