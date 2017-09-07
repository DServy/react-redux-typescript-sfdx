import axios from 'axios'
import { AxiosError, AxiosInstance } from 'axios'
import { SObject } from './sObjects'

//passed in via global scope
declare var accessToken: string;

interface QueryResponse<T> {
    totalSize: number;
    records: T[];
}

export class RestClient
{
    private static _instance: RestClient;

    public request: AxiosInstance;
    public version: string;
    private constructor()
    {
        this.version = 'v40.0'
        this.request = axios.create({
            baseURL:`/services/data/${this.version}/`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            responseType: 'json'
        });
    }

    //get records of type T.  Do magic to cast plain json to T
    public static query<T extends SObject>(type: { new(): T ;}, query: string): Promise<QueryResponse<T>> {
        let qryString = encodeURIComponent(query);
        return new Promise<QueryResponse<T>>((resolve, reject) => {
            if(!this._instance){
                this._instance = new this();
            }
            this._instance.request.get(`/query?q=${qryString}`)
            .then((response) => {
                let sobs: Array<T> = [];
                for(let i = 0; i < response.data.records.length; i++){
                    let sob = Object.assign(new type(), response.data.records[i]);
                    sobs.push(sob);
                }
                response.data.records = sobs;
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.log(error.message);
                reject(error);
            });;
        });
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

}

