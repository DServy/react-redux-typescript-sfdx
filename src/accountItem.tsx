import React from 'react'
import {Account} from './lib/sObjects';

interface AccountItemProps{
    account: Account;
}

export class AccountItem extends React.Component<AccountItemProps, {}>{

    constructor(props: AccountItemProps){
        super(props);
    }

    //not sure how to update account
    //  (or really how to update state of list of accounts after updating on SF)
    render(){
        return (
            <div id={'acc_' + this.props.account.Id}>
                <h4>{this.props.account.Name}</h4>
                <button>Update Account</button>
            </div>
        )
    }
}