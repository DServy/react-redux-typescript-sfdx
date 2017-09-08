// Task Obj
// Allows for both the use of VF Remote objects in Prod and db.json in dev

// Interface for Salesforce Remote Object
interface IRemoteObject {

}
// Interface for Task Objc
interface ITask extends IRemoteObject {

}

export class Task {
    task: ITask;
    constructor() {
        if (process.env.production === true) {
            // use VF Remote objects
        }else {
            // Dont use VS code remote objects
        }
    }
}