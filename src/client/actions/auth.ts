import { ACTION_TYPES } from './types';

export const LogIn = (value) => {
	return {
		type: ACTION_TYPES.AUTH.LOGIN,
		value
	};
};

export const AuthSuccess = (value) => {
	return {
		type: ACTION_TYPES.AUTH.SUCCESS,
		value
	};
};

export const AuthFail = () => {
	return {
		type: ACTION_TYPES.AUTH.FAILED,
		value: null
	};
};
