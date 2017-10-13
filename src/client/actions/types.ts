export const ACTION_TYPES = {
	AUTH: {
		LOGIN: 'LOGIN',
		LOGOUT: 'LOGOUT',
		REGISTER: 'REGISTER'
	},
};

export interface IAction {
	type: string,
	value: object
};
