import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Protected from './Protected';

export default class Home extends React.Component {
	render() {
		return (
			<div className='asd'>
				something
				<Link to='/private' >Private </Link>
				<Switch>
					<Route path='/private' component={Protected} />
					<Route path='/asd' />
				</ Switch>
			</div>
		);
	}
}
