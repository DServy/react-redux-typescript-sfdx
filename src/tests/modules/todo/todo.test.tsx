import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { Todo }  from '../../../modules/todo/todo';
// import the reducer state type
import { GlobalState } from '../../../reducers/index'

import { RemoveTodoAction } from '../../../reducers/todo'
import { AddDoneAction } from '../../../reducers/done'

type TodoState = {
    [todo in 'todo']: GlobalState[todo]
}

const mockStore = configureMockStore<TodoState>([]);
it('renders without crashing while empty', () => {
    let todo = shallow(< Todo todos={[]} dispatch={function(){}} />)
    expect(todo.find('.todolist').exists()).toEqual(true)
})

it('renders without crashing with list', () => {
   let todo = shallow(<Todo todos={['one', 'two']} dispatch={function(){}} />)
   expect(todo.find('.todolist').exists()).toEqual(true)
   expect(todo.find('ul').children().length).toEqual(2)
   expect(todo.find('.count-todos').text()).toEqual('2')
})

it('renders with a redux state', () => {
    const store = mockStore({ todo: ['one', 'two']})
    let todo = shallow(<Todo todos={store.getState().todo} dispatch={store.dispatch} />)
    expect(todo.find('.todolist').exists()).toEqual(true)
    expect(todo.find('ul').children().length).toEqual(2)
    expect(todo.find('.count-todos').text()).toEqual('2')
})

it('mark as done dispatches actions', () => {
    const store = mockStore({todo: ['one','two']})
    let todo = shallow(<Todo todos={store.getState().todo} dispatch={store.dispatch} />)
    expect(todo.find('.todolist').exists()).toEqual(true)
    expect(todo.find('ul').children().length).toEqual(2)
    // find the todoItem and run the click fucntion
    let first = todo.find('ul').children().first()
    expect(first.props().text).toEqual('one')
    // expected action value
    let todoAction: RemoveTodoAction = {
        type: 'REMOVE_TODO',
        index: 0
    }
    let doneAction: AddDoneAction = {
        type: 'ADD_DONE',
        add: first.props().text
    }
    // fire click action
    first.props().click()
    expect(store.getActions()).toEqual([todoAction, doneAction])
    
})
