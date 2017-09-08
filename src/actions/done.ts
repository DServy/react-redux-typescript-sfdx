import { AddDoneAction, RemoveDoneAction } from '../reducers/done'

export const addDone = (done: string): AddDoneAction => {
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