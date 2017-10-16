import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<Home />
		</ BrowserRouter>
	</Provider>
), document.getElementById('root'));
