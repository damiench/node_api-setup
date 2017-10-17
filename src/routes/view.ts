import * as express from 'express';
import * as path from 'path';
const viewRoutes = express.Router();
import { mustAuthenticatedMiddleware } from '../passport';

viewRoutes
	.all('/private', mustAuthenticatedMiddleware)
	.all('/private/*', mustAuthenticatedMiddleware)
	.get('/*', (req, res) => {
		let isProd = process.env.NODE_ENV === 'production';
		let fileUrl = isProd
			? path.join(__dirname + '/../client/index.html')
			: path.join(__dirname + '/../../src/client/dev.html');

		res.sendFile(fileUrl);
	});

export default viewRoutes;
