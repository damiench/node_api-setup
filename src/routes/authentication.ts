import * as express from 'express';
const authRoutes = express.Router();
import { login, register, logout } from '../passport';

authRoutes
	.post('/login', login)
	.post('/register', register)
	.get('/logout', logout)
	.get('/getUser', (req, res) => {
		let userToSend = req.user;
		delete userToSend.password;
		res.json(userToSend);
	});

export default authRoutes;
