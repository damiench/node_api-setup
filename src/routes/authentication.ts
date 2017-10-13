import * as express from 'express';
const authRoutes = express.Router();
import { login, register, logout } from '../passport';

authRoutes
	.post('/login', login)
	.post('/register', register)
	.get('/logout', logout);

export default authRoutes;
