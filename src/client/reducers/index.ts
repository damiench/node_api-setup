import { combineReducers } from 'redux';
import authReducer from './auth';

let reducers = combineReducers({authReducer});

export default reducers;
