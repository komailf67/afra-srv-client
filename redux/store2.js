import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReduces from './reducers';
import logger from 'redux-logger';

let middleware = [logger, thunkMiddleware];

const store = createStore(rootReduces, applyMiddleware(...middleware));

export default store;
