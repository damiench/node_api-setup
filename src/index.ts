import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
// add pretty console log
import './utils/console';
// connect to database
import './db/connection';

const app = express();

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
