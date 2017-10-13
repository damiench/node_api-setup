import * as express from 'express';
import * as path from 'path';
const viewRoutes = express.Router();
import { mustAuthenticatedMiddleware } from '../passport';

viewRoutes
	.all('/private', mustAuthenticatedMiddleware)
	.all('/private/*', mustAuthenticatedMiddleware)
	.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname + '/../client/index.html'));
	});

export default viewRoutes;
