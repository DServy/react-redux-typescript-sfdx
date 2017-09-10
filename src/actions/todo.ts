import { Dispatch } from 'redux'
import { AddTodoAction, RemoveTodoAction, ClearTodoAction, GetTodoAction } from '../reducers/todo';
import { Task } from '../objects/sObjects';

export const addTodo = (todo: Task): AddTodoAction => {
    return {
        type: 'ADD_TODO',
        add: todo
    };
};
export const addTodoAsync = (todo: string): Dispatch<AddTodoAction> => {
    let t = new Task();
    t.Description = todo;
    t.Status = 'open';
    return function(dispatch: Dispatch<AddTodoAction>) {
        t.insert().then(r => {
            dispatch(addTodo(t));
        })
    }
}
// takes the index and removes it
export const removeTodo = (index: number): RemoveTodoAction => {
    return {
        type: 'REMOVE_TODO',
        index: index
    };
};
// remove all todos
export const clearTodo = (): ClearTodoAction => {
    return {
        type: 'CLEAR_TODO'
    };
};
// load all todos
export const getTodos = (): Dispatch<GetTodoAction> => {
    return function(dispatch: Dispatch<GetTodoAction>){
        Task.getOpenTasks().then(tasks => {
            dispatch({
                type: 'GET_TODO',
                todo: tasks
            })
        })
    }
}