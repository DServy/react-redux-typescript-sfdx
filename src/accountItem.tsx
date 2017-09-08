import * as React from 'react';
import {Account} from './lib/sObjects';

interface AccountItemProps{
    key: string;
    account: Account;
    handleClick: any;
}

interface AccountItemState{
    newName: string;
}

export class AccountItem extends React.Component<AccountItemProps, AccountItemState>{

    constructor(props: AccountItemProps){
        super(props);

        this.state = {
            newName: ''
        }
    }

    public updateNameInput(evt: any){
        this.setState({newName: evt.target.value});
    }

    //not sure how to update account
    //  (or really how to update state of list of accounts after updating on SF)
    render(){
        return (
            <li>{this.props.account.Name}
                <input value={this.state.newName} onChange={evt => this.updateNameInput(evt)} type="text" />
                <button onClick={() => this.props.handleClick(this.props.account, this.state.newName)}>
                    Update Account Name
                </button>
            </li>
        )
    }
}