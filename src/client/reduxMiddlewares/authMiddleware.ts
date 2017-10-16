import { ACTION_TYPES } from '../actions/types';
import axios from 'axios';

export default (store) =>
	next =>
		action => {
			const result = next(action);

			if (action.type == ACTION_TYPES.AUTH.LOGIN) {
				console.log(action.value);
				return axios.post('/authenticate/login', action.value)
					.then((response) => {

						console.log('res: ', response);
						return axios.get('/authenticate/getUser');
					})
					.then((userRes) => {
						console.log(userRes);

						return result;
					})
					.catch(err => {console.log(err);});
			}
			else {

				return result;
			}
		}
