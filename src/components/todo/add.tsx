import * as React from 'react'
import { Component } from 'react'
import { addTodo } from '../../actions/todo'

interface AddProps{
    dispatch(action: any): any;
}

export default class Add extends Component<AddProps, {}> {
    handleChange(event: React.KeyboardEvent<HTMLInputElement>){
        if(event.keyCode === 13){
            if(event.currentTarget.value){
                this.props.dispatch(addTodo(event.currentTarget.value))
            }
            event.currentTarget.value = ''
        }
    }
    
    render(){
        return(
            <input type="text" className="form-control add-todo" placeholder="Add todo" onKeyDown={this.handleChange.bind(this)} />
        )
    }
}
