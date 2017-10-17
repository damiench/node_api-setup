import { ACTION_TYPES } from '../actions/types';
import { AuthSuccess, AuthFail } from '../actions/auth';
import axios from 'axios';
import store from '../store';

export default (store) =>
	next =>
		action => {
			const result = next(action);

			if (action.type == ACTION_TYPES.AUTH.LOGIN) {
				console.log(action.value);
				return axios.post('/authenticate/login', action.value)
					.then((response) => {

						return axios.get('/authenticate/getUser');
					})
					.then((userRes) => {
						store.dispatch(AuthSuccess(userRes.data));

						return result;
					})
					.catch(err => {
						store.dispatch(AuthFail());

						return result;
					});
			}
			else {
				return result;
			}
		}
