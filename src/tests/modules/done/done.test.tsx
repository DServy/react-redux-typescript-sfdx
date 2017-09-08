import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { Done }  from '../../../modules/done/done';
// import the reducer state type
import { GlobalState } from '../../../reducers/index'
// import the action types
import {RemoveDoneAction} from '../../../reducers/done'

type DoneState = {
    [done in 'done']: GlobalState[done]
}

const mockStore = configureMockStore<DoneState>([]);

it('renders without crashing while empty', () => {
    let done = shallow(<Done done={[]} dispatch={function(){}} />)
    expect(done.find('#done-items').exists()).toEqual(true)
})

it('renders without crashing with list', () => {
   let done = shallow(<Done done={['one','two']} dispatch={function(){}} />)
   expect(done.find('#done-items').exists()).toEqual(true)
   expect(done.find('ul').children().length).toEqual(2)
})

it('renders with a redux state', () => {
    const store = mockStore({done: ['one','two']})
    let done = shallow(<Done done={store.getState().done} dispatch={store.dispatch} />)
    expect(done.find('#done-items').exists()).toEqual(true)
    expect(done.find('ul').children().length).toEqual(2)
})

it('mark as done dispatches actions', () => {
    const store = mockStore({done: ['one','two']})
    let done = shallow(<Done done={store.getState().done} dispatch={store.dispatch} />)
    expect(done.find('#done-items').exists()).toEqual(true)
    expect(done.find('ul').children().length).toEqual(2)
    // find the doneItem and run the click fucntion
    let first = done.find('ul').children().first()
    expect(first.text()).toEqual('one')
    // expected action value
    let doneAction: RemoveDoneAction = {
        type: 'REMOVE_DONE',
        index: 0
    }
    // fire click action
    first.find('button').simulate('click')
    expect(store.getActions()).toEqual([doneAction])
    
})
