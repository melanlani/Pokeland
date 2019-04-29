import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

const middleware = applyMiddleware(promise, logger)
const store = createStore(reducers, middleware)

export default store;
