import { ACTION_TYPES, IAction } from '../actions/types';

const defaultState = {
	isAuthenticated: false,
	auth: null
};

export default (state = defaultState, action: IAction) => {
	switch (action.type) {
		case ACTION_TYPES.AUTH.LOGIN:
			return {
				isAuthenticated: true,
				auth: action.value
			};
		case ACTION_TYPES.AUTH.LOGOUT:
			return {
				isAuthenticated: false,
				auth: null
			};
		default:
			return state;
	}
};
