import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import Add from '../../components/todo/add'
import TodoItem from '../../components/todo/item'
// import actions
import { removeTodo } from '../../actions/todo'
import { addDone } from '../../actions/done'

interface TodoProps {
    todos: Array<string>,
    dispatch(action: any): any;
}

export class Todo extends Component<TodoProps, {}> {
    
    renderTodos(){
        if(this.props.todos){
            let self = this
            return this.props.todos.map((t, i) => {
                return <TodoItem text={t} key={i} click={self.markAsDone.bind(self, i)} />
            });
        }
        return '';
    }
    markAsDone(index: number){
        let todo = this.props.todos[index];
        this.props.dispatch(removeTodo(index));
        this.props.dispatch(addDone(todo));
    }
    render() {
        return (<div className="col-md-6">
            <div className="todolist not-done">
                <h1>Todos</h1>
                <Add dispatch={this.props.dispatch}/>
                <hr />
                <div>
                    <ul id="sortable" className="list-unstyled">
                        {this.renderTodos()}
                    </ul>
                </div>
                <div className="todo-footer">
                    <strong><span className="count-todos">{this.props.todos.length}</span></strong> Items Left
                 </div>
            </div>
        </div>);
    }
}
export default connect((state) => {
  return { todos: state.todos }
})(Todo);