import { applyMiddleware, createStore } from 'redux';
// middlewares
import * as createLogger from 'redux-logger';
import Thunk from 'redux-thunk';
import PromiseMiddleware from 'redux-promise-middleware'
// reducers
import reducers from './reducers'
const logger = (createLogger as any)();
// set the middleware
const devMiddleware = applyMiddleware(PromiseMiddleware(), Thunk, logger);
const prodMiddleware = applyMiddleware(PromiseMiddleware(), Thunk);
const middleware = (process.env.NODE_ENV === 'production') ? prodMiddleware : devMiddleware;
export default createStore(reducers, middleware);