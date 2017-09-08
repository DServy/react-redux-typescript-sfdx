// done state for global state
export type DoneState = string[]

// action reducer types 

export type AddDoneAction = {
    type: 'ADD_DONE',
    add: string
}
export type RemoveDoneAction = {
    type: 'REMOVE_DONE',
    index: number
}

type Action = AddDoneAction | RemoveDoneAction

const initState: DoneState = []


const done = (state: Array<string> = initState, action: Action): Array<string> => {
    switch(action.type){
        case 'ADD_DONE':
            // why not array push? because each state has to be a completely new object
            // array push modifiys the current object (state) instead of generating a new one
            // this is shorthand for state.concat([action.add])
            return [...state, action.add]
        case 'REMOVE_DONE':
            // why not some slices here? 
            // array slice modifices the current object (state) instead of generating a new one
            // this one takes the sate, splits it into two arrays based on the index given
            // and then concats them, which returns a brand new array object
            return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
        default:
            return state       
    }
};

export default done;