import * as React from "react";
import { Component } from "react";

 interface ItemProps {
        text: string,
        click?(action: any): any
    }

class TodoItem extends Component<ItemProps, {}> {
    render() {
        return (
            <li>
                <button onClick={this.props.click} className='btn btn-default btn-xs pull-left'><span className="glyphicon glyphicon-remove"></span></button>  {this.props.text}
            </li>
        )
    }
}

export default TodoItem



