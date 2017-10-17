import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Protected from './Protected/Protected';
import Auth from './Auth/AuthComponent';
import ProtectedRoute from './ProtectedRoute';

export default class Home extends React.Component {
	render() {
		return (
			<div className='asd'>
				something
				<div>
					<Link to='/private' >Private </Link>
				</div>
				<div>
					<Link to='/auth' >Authorize </Link>
				</div>
				<Switch>
					<ProtectedRoute path='/private' component={Protected} />
					<Route path='/auth' component={Auth} />
				</ Switch>
			</div>
		);
	}
}
