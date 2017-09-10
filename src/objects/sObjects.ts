import { Rest, RestObject, RestBaseConfig } from 'ts-force'

//let typescript know we expect these on global scope
declare var __RESTHOST__ : string;
declare var __ACCESSTOKEN__ : string;

//set configurations
let config = new RestBaseConfig();
config.host = __RESTHOST__;
config.accessToken = __ACCESSTOKEN__;
//set static config on Rest
Rest.config = config;

/* Concrete SObject Objects */

//these could be generated via the meta-data api very easily
//  Could also use a Mapper patterns to get rid of __c

export class Account extends RestObject {
    name: string;
    website: string;
    active__c?: string;
    constructor() {
        super('Account');
    }
    public static async getAccounts(): Promise<Account[]> {
        const response =  await Rest.query(Account, 'SELECT id, name, website, active__c FROM Account ORDER BY Name LIMIT 10')
        return <Account[]> response.records
    }
}
export class Task extends RestObject {
    Id: string;
    Description: string;
    Status: string;
    constructor(){
        super('Task');
    }
    public static async getTasks(): Promise<Task[]> {
        const response =  await Rest.query(Task, 'Select id, description, status From Task Limit 100');
        return <Task[]> response.records
    }
    public static async getOpenTasks(): Promise<Task[]> {
        const response =  await Rest.query(Task, 'Select id, description, status From Task Where status=\'open\'');
        return <Task[]> response.records
    }
    public static async getClosedTasks(): Promise<Task[]> {
        const response =  await Rest.query(Task, 'Select id, description, status From Task Where status=\'closed\'');
        return <Task[]> response.records
    }
}


