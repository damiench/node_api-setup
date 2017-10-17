export const ACTION_TYPES = {
	AUTH: {
		LOGIN: 'LOGIN',
		LOGOUT: 'LOGOUT',
		REGISTER: 'REGISTER',
		SUCCESS: 'SUCCESS',
		FAILED: 'FAILED'
	},
};

export interface IAction {
	type: string,
	value: object
};
