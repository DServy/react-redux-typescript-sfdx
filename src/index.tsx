import React from 'react'
import ReactDOM from 'react-dom'
import {RestClient} from './lib/RestClient';
import {Account} from './lib/SObjects';

import {AccountItem} from './accountItem'


interface IAppProps {
    // remoteObjectModel: RemoteObjectModel
}

interface IAppState {
    accounts: Account[]
}


export class App extends React.Component<IAppProps, IAppState>{

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            accounts: []
        }
    }

    public createNewAccount(){
        let acc = new Account();
        acc.Name = 'blah blah';
        acc.Website = 'google.com';
        acc.insert();


        this.state.accounts.push(acc);
        this.setState({accounts: this.state.accounts}); //not sure this is correct...
    }

    // load accounts
    public componentDidMount(){
        RestClient.query<Account>(Account, 'SELECT Id, Name, Website, Active__c FROM Account ORDER BY Name LIMIT 10')
        .then((response) => {
            this.setState({accounts: response.records});
        });

    }

    public render() {

        return (
            <div>
                {
                    this.state.accounts.map((acc, index) => {
                        return <AccountItem account={acc} />
                    })
                }
                <button onClick={this.createNewAccount} >Create New Account</button>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'))