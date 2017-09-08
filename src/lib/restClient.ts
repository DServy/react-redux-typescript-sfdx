import axios, {AxiosError, AxiosInstance} from 'axios';
import { SObject } from './sObjects'

//passed in via global scope
declare var __ACCESSTOKEN__: string;
declare var __RESTHOST__: string;

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
            baseURL: `${__RESTHOST__}/services/data/${this.version}/`,
            headers: {
                'Authorization': 'Bearer ' + __ACCESSTOKEN__,
                'Content-Type': 'text/plain',
                'Accept': 'text/plain'
            }
        });

        console.log(__ACCESSTOKEN__);
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

