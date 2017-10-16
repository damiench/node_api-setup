import { ACTION_TYPES } from './types';

export const LogIn = (value) => {
	return {
		type: ACTION_TYPES.AUTH.LOGIN,
		value
	};
};
