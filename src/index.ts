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

// add routers to application
import * as requireTree from 'require-tree';
let routes = requireTree('./routes');

app.use('/user', routes.user.default);

app.use('/', routes.view.default);

app.use('/authenticate', routes.authentication.default)



//noinspection TypeScriptUnresolvedVariable
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
	if (err)
		return console.error(err);

	return console.log(`server up and running on port ${port}!`);
});
