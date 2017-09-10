import todo from '../../reducers/todo'
import * as actions from '../../actions/todo'
import { Task } from '../../objects/sObjects';


it('Should update state with new todo', () => {
    let t = new Task()
    expect(todo([], actions.addTodo(t))).toEqual([t])
})
it('Should remove a todo', () => {
    let todos = [new Task(), new Task(), new Task()]
    //remove the "two" todo
    expect(todo(todos, actions.removeTodo(1))).toEqual([todos[0], todos[1]])
})