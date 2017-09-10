import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { removeDone, getDone } from '../../actions/done'
import { Task } from '../../objects/sObjects'

interface DoneProps{
    done: Array<Task>,
    dispatch(action: any): any;
}

export class Done extends Component<DoneProps, {}> {

    componentWillMount(){
        // mountin component, load dones
        this.props.dispatch(getDone());
    }
    renderDone(){
        const self = this
        if(this.props.done){
            return this.props.done.map((d, i) => {
                return (
                    <li key={i}>{d.Description}<button className="remove-item btn btn-default btn-xs pull-right" onClick={self.removeFromDone.bind(self, i)}><span className="glyphicon glyphicon-remove"></span></button></li>
                );
            });
        }
        return '';
    }
    removeFromDone(index: number){
        this.props.dispatch(removeDone(index));
    }
    render() {
        return (
            <div className="col-md-6">
                <div className="todolist">
                    <h1>Already Done</h1>
                    <ul id="done-items" className="list-unstyled">
                        {this.renderDone()}
                    </ul>
                </div>
            </div>);
    }
}

export default connect((state) => {
   return { done: state.done }
})(Done);