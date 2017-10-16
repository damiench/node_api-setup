import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { selectUserByEmail, UserModel,
	getUserById, createUser } from './db/User';
import { compareWithHash } from './utils/hash';

passport.use(new Strategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(username, password, done) {
	console.log(arguments);
	var user;

	return selectUserByEmail(username)
		.then((_user): any => {
			user = _user;

			if (!user)
				return done(null, false, { message: 'incorrect email' });
			console.log(user)
			return compareWithHash(user.password, password);
		})
		.then((isSimilar) => {
			console.log(isSimilar);
			return isSimilar
				? done(null, user)
				: done(true, false, { message: 'incorrect password' });
		})
		.catch(err => done(err));
}));

passport.serializeUser((user: UserModel, done) => {
	done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
	getUserById(id)
		.then(user => done(null, user))
		.catch(err => done(err));
});

export const login = function(req, res, next) {

	passport.authenticate('local',
		function(err, user, info) {
			console.log(err, user, info);

			return err
			   ? next(info)
			   : user
				 ? req.logIn(user, function(err) {
					 return err
					   ? next(err)
					   : res.redirect('/');
				   })
				 : res.redirect('/');
		}
	)(req, res, next);
};

export const logout = (req, res) => {
	req.logout();
	res.redirect('/');
};

export const register = (req, res, next) => {
	createUser(req.body)
		.then((user) => {
			return selectUserByEmail(req.body.email);
		})
		.then((user) => {
			req.logIn(user, (err) => {
					return err
						? next(err)
						: res.redirect('/private');
				});
		})
		.catch(err => {
			next(err);
		});
};

export const mustAuthenticatedMiddleware = (req, res, next) => {
	console.log('path: ', req.path);
	req.isAuthenticated()
		? next()
		: res.redirect('/auth');
};

export default passport;
