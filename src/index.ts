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

app.use(express.static(path.join(__dirname, '/../build/client')));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));


// initialize passport middlewares before routes added
app.use(passport.initialize());
app.use(passport.session());

// include router middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


// add routers to application

import authRoutes from './routes/authentication';
app.use('/authenticate', authRoutes);

import userRoutes from './routes/user';
app.use('/user', userRoutes);

import viewRoutes from './routes/view';
app.use('/', viewRoutes);



//noinspection TypeScriptUnresolvedVariable
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
	if (err)
		return console.error(err);

	return console.log(`server up and running on port ${port}!`);
});
