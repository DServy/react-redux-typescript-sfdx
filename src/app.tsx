import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux'
import './css/App.css';
import Todo from './modules/todo/todo'
import Done from './modules/done/done'

// import the store
import Store from './store'

class App extends Component<{},{}> {
  render() {
    return (
      <Provider store={Store}>
        <div className="container">
              <div className="row">
                  <Todo />
                  <Done />
              </div>
          </div>
      </ Provider>
    );
  }
}

export default App
