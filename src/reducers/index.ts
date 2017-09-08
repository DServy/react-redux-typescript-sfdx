import { combineReducers } from 'redux';
// Import reducers
import todos, { TodoState } from './todo';
import done, { DoneState } from './done';

export type GlobalState = {
    todo: TodoState,
    done: DoneState
};

export default combineReducers({
    todos,
    done
});