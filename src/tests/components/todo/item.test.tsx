import * as React from 'react';
import { shallow } from 'enzyme';
import Item from '../../../components/todo/item';

it('renders without crashing', () => {
  let item = shallow(<Item text='' />)
  expect(item.find('li').exists()).toEqual(true)
  expect(item.find('.btn').exists()).toEqual(true)
});

it('Should Set a text prop', () => {
  let item = shallow(<Item text='test Here' />)
  expect(item.find('li').text()).toEqual(' test Here')
})
it('Should set a click function that works', () => {
  let clicked = false
  let clickFn = () => {
    clicked = true
  }
  let item = shallow(<Item text='clickTest' click={clickFn} />)
  expect(clicked).toEqual(false)
  item.find('button').simulate('click')
  expect(clicked).toEqual(true)
})


