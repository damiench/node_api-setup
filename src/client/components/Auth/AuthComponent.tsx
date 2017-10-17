import * as React from 'react';
import store from '../../store';
import { LogIn } from '../../actions/auth';

interface IState {
	email: string,
	password: string,
	valid: boolean
}

export default class Auth extends React.Component<any, IState> {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			valid: false
		};
	}

	handleInputChange(type, ev) {
		// chrome, why do you autocomplete fields, I asked you not to do so T_T

		if (ev.target.value.length - this.state[type].length === 1
			|| ev.target.value.length < this.state[type].length)
			this.setState({ [type]: ev.target.value });
	}

	handleButtonClick() {
		let { email, password } = this.state;

		store.dispatch(LogIn({ email, password }));
	}

	render() {
		let { email, password } = this.state;

		let inputStyle = {
			display: 'block',
			margin: 5
		};

		return (<div>
			<input
				style={inputStyle}
				value={email}
				type='text'
				onChange={this.handleInputChange.bind(this, 'email')} />
			<input
				style={inputStyle}
				value={password}
				type='password'
				onChange={this.handleInputChange.bind(this, 'password')} />
			<button
				style={{margin: 10}}
				onClick={this.handleButtonClick.bind(this)}>
				Log in
			</ button>
		</div>);
	}
}
