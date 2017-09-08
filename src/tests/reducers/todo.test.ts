import todo from '../../reducers/todo'
import * as actions from '../../actions/todo'


it('Should update state with new todo', () => {
    let t = "I am a new todo"
    expect(todo([], actions.addTodo(t))).toEqual([t])
})
it('Should remove a todo', () => {
    let todos = ['one', 'two', 'three']
    //remove the "two" todo
    expect(todo(todos, actions.removeTodo(1))).toEqual(['one', 'three'])
})