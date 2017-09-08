import { AxiosError } from 'axios';
import * as React from 'react';
import {RestClient} from './lib/restClient';
import {Account} from './lib/sObjects';

import {AccountItem} from './accountItem'


interface IAppState {
    accounts: Account[]
    newAccountName: string;
}


class App extends React.Component<{}, IAppState> {
    constructor(props) {
        super(props);

        this.state = {
            newAccountName: '',
            accounts: []
        }
        this.updateAccount = this.updateAccount.bind(this);
    }

    public updateAccount(acc: Account, newName: string){

        //this is touching the account?
        // is that bad even though we update state immediately after?
        acc.Name = newName;
        acc.update()
        .catch((error: AxiosError) => {
            alert(JSON.stringify(error.response.data));
        });;
        this.setState({accounts: this.state.accounts.splice(0)})
    }

    public createAccount(){
        let acc = new Account();
        acc.Name = this.state.newAccountName;
        acc.Website = 'required.com';
        acc.insert().then(()=>{
            this.setState({accounts: [...this.state.accounts, acc]});
        }).catch((error: AxiosError)=>{
            alert(JSON.stringify(error.response.data));
        });;
    }

    public updateNewAccountName(evt: any){
        this.setState({newAccountName:evt.target.value})
    }

    // load accounts
    public componentDidMount(){
        if(this.state.accounts.length){
            return;
        }
        RestClient.query<Account>(Account, 'SELECT Id, Name, Website, Active__c FROM Account ORDER BY Name LIMIT 10')
        .then((response) => {
            this.setState({accounts: response.records});
        }).catch((error: AxiosError)=>{
            alert(error.response.data);
        });
    }

    render() {
        return (
            <div>
                <h4>Account Creator</h4>
                <input value={this.state.newAccountName} onChange={evt => this.updateNewAccountName(evt)} type="text" /><button onClick={() => this.createAccount()}>Create New Account</button>
                <ul>
                    {
                        this.state.accounts.map((acc, index) => {
                            return <AccountItem handleClick={this.updateAccount} key={'acc_' + index} account={acc} />
                        })
                    }
                </ul>

            </div>
        );
    }
}

export default App;