//this is super confusing but it works... https://github.com/Microsoft/TypeScript/issues/6413
export abstract class RemoteObject{}

export interface RemoteObject {
    get?(field: string): string;
    set?(field: string, value: string);
    retrieve?(args: any, callback: RetrieveCallbackType);
}

interface RetrieveCallbackType { (err:any, records:RemoteObject[], event:any): void }

// abstract class AccountProperties extends RemoteObject {
//     Name: string;
//     Active: Boolean;
// }

export class RemoteObjectModel {
    Account: {new(p: any): RemoteObjectModel.Account}
    // Account: {new(p: AccountProperties): RemoteObjectModel.Account}
}

export namespace RemoteObjectModel {
    export class Account extends RemoteObject{
        constructor(values: any){super()}
    }
}