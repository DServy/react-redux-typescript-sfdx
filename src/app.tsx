import * as React from 'react'
import {RestClient} from './lib/restClient';
import {Account} from './lib/sObjects';

import {AccountItem} from './accountItem'


interface IAppState {
    accounts: Account[]
}


class App extends React.Component<{}, IAppState> {
    constructor(props) {
        super(props);

        this.state = {
            accounts: []
        }
    }

    // load accounts
    public componentDidMount(){
        RestClient.query<Account>(Account, 'SELECT Id, Name, Website, Active__c FROM Account ORDER BY Name LIMIT 10')
        .then((response) => {
            this.setState({accounts: response.records});
        });

    }

    render() {
        return (
            <div>
                {
                    this.state.accounts.map((acc, index) => {
                        return <AccountItem account={acc} />
                    })
                }
                 <button>Create New Account</button>
            </div>
        );
    }
}

export default App;