import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as session from 'express-session';
import passport from './passport';
// add pretty console log
import './utils/console';
// connect to database
import './db/connection';

const app = express();

app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

// include router middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// add routers to application
import userRouter from './routes/user';

app.use('/user', userRouter);

//noinspection TypeScriptValidateTypes
app.get('/', (req, res) => {
	res.end('Hi there');
});

//noinspection TypeScriptUnresolvedVariable
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
	if (err)
		return console.error(err);

	return console.log(`server up and running on port ${port}!`);
});
