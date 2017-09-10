import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import Add from '../../components/todo/add'
import TodoItem from '../../components/todo/item'
// import actions
import { removeTodo, getTodos } from '../../actions/todo'
import { addDone } from '../../actions/done'
import { Task } from '../../objects/sObjects'

interface TodoProps {
    todos: Array<Task>,
    dispatch(action: any): any;
}

export class Todo extends Component<TodoProps, {}> {
    componentWillMount(){
        this.props.dispatch(getTodos());
    }
    renderTodos(){
        if(this.props.todos){
            let self = this
            return this.props.todos.map((t, i) => {
                return <TodoItem text={t.Description} key={i} click={self.markAsDone.bind(self, i)} />
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