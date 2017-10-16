import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import authMiddleware from './reduxMiddlewares/authMiddleware';
const createStoreWithMiddleware = applyMiddleware(authMiddleware)(createStore);

const store = createStoreWithMiddleware(
	reducers,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__
		&& (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;
