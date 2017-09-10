import { AddDoneAction, RemoveDoneAction, GetDoneAction } from '../reducers/done'
import { Dispatch } from 'redux'
import { Task } from '../objects/sObjects';

export const addDone = (done: Task): AddDoneAction => {
    return {
        type: 'ADD_DONE',
        add: done
    }
};
// takes the index and removes it
export const removeDone = (index: number): RemoveDoneAction => {
    return {
        type: 'REMOVE_DONE',
        index: index
    }
};
export const getDone = (): Dispatch<GetDoneAction> => {
    return function(dispatch: Dispatch<GetDoneAction>){
        Task.getClosedTasks().then(tasks => {
            dispatch({
                type: 'GET_DONE',
                done: tasks
            })
        })
    }
}