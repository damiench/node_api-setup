import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { selectUserByEmail, UserModel,
	getUserById, createUser } from './db/User';
import { compareWithHash } from './utils/hash';

passport.use(new Strategy({
	usernameField: 'email',
	passwordField: 'password'
}, (username, password, done) => {

	var user;

	return selectUserByEmail(username)
		.then((_user: UserModel): any => {
			if (!user)
				return done(null, false, { message: 'incorrect email' });
			user = _user;

			return compareWithHash(user.passsword, password);
		})
		.then((isSimilar) => {

			return isSimilar
				? done(null, user)
				: done(null, false, { message: 'incorrect password' });
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
	passport.authenticate('local', (err, user, info) => {
		return err
			? next(err)
			: user
				? req.logIn(user, (err) => {
					return err
						? next(err)
						: res.redirect('/pricate');
				})
				: res.redirect('/');
	})(req, res, next);
};

export const logout = (req, res) => {
	req.logout();
	res.redirect('/');
};

export const register = (req, res, next) => {
	createUser(req.body)
		.then((user) => {
			return user.isError
				? next(user.message)
				: req.logIn(req.body, (err) => {
					return err
						? next(err)
						: res.redirect('/private');
				});
		});
};

export default passport;
