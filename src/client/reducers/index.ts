import { combineReducers } from 'redux';
import authReducer from './auth';

let reducers = combineReducers({ 
	auth: authReducer
});

export default reducers;
