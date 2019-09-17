import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import themeReducer from './themeReducer';

const middlewares = [thunk];
const store = createStore(combineReducers({reducers, themeReducer}), applyMiddleware(...middlewares));

export default store;