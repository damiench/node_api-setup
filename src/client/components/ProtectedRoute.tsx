import * as React from 'react';
import store from '../store';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest}) => {
	const { auth } = store.getState();

	const render = (props) =>
		auth.isAuthenticated
			? <Component {...props} />
			: <Redirect to={{ pathname: '/', state: { from: props.location } }} />;

	return (<Route {...rest} render={render} />);
};

export default ProtectedRoute;
