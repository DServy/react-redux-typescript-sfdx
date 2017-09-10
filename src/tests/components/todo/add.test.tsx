import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import Add  from '../../../components/todo/add';
import { Task } from '../../../objects/sObjects';
// import the reducer state type
import { GlobalState } from '../../../reducers/index'
// import the action states
import { AddTodoAction } from '../../../reducers/todo'
type TodoState = {
    [todo in 'todo']: GlobalState[todo]
}

const mockStore = configureMockStore<TodoState>([]);

it('renders without crashing', () => {
    const store = mockStore({todo: [] })
    let add = shallow(<Add dispatch={store.dispatch} />)
    expect(add.find('input').exists()).toEqual(true)
})

it('should handle event', () => {
    const store = mockStore({todo: [] })
    let add = shallow(<Add dispatch={store.dispatch} />)
    expect(store.getState().todo).toEqual([])
    // add in some text
    add.simulate('keyDown', {keyCode: 13,target: {value: 'hello'}})
    // expected action value
    let action: AddTodoAction = {
        type: 'ADD_TODO',
        add: new Task()
    }
    expect(store.getActions()).toEqual([action])
})
