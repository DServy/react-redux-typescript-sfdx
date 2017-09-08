import { AddTodoAction, RemoveTodoAction, ClearTodoAction } from '../reducers/todo';
import { Task } from '../lib/sObjects';

export const addTodo = (todo: string): AddTodoAction => {
    const task = new Task();
    task.description = todo;
    task.status = 'open';
    task.insert().then(r => {
    })
    return {
        type: 'ADD_TODO',
        add: todo
    };
};
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