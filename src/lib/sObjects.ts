import {RestClient} from './restClient';
import {AxiosError} from 'axios';
/* Base SObject */

export class SObjectAttributes {
    public type: string;
}

export abstract class SObject{
    constructor(type: string) {

        this.attributes = new SObjectAttributes();
        this.attributes.type = type;
    }
    public Id: string;
    public attributes: SObjectAttributes;
}


export interface DMLResponse {
    id: string;
    errors: any[];
    success: boolean;
}

export class SObjectClient extends SObject{

    constructor(type: string) {
        super(type);
    }

    public insert(): Promise<DMLResponse> {

        return new Promise<DMLResponse>((resolve, reject) => {
            RestClient.Instance.request.post(
                `/sobjects/${this.attributes.type}/`,
                this
            ).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.log(error.response.data);
                reject(error);
            });
        });
    }


    public update(): Promise<DMLResponse> {

        if (this.Id == null) {
            throw 'Must have Id to update!';
        }
        let data = Object.assign({}, this);
        data.Id = undefined;

        return new Promise<DMLResponse>((resolve, reject) => {
            RestClient.Instance.request.post(
                `/sobjects/${this.attributes.type}/${this.Id}?_HttpMethod=PATCH`,
                data
            ).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.log(error.response.data);
                reject(error);
            });
        });
    }

}


/* Concrete SObject Objects */

//these could be generated via the meta-data api very easily
//  Could also use a Mapper patterns to get rid of __c

export class Account extends SObjectClient {
    constructor(){
        super('Account');
    }
    Name: string;
    Website: string;
    Active__c?: string;
}

