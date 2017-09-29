import * as express from 'express';
import * as path from 'path';
import './db/connection';
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.end('Hi there');
});


app.listen(port, (err) => {
	if (err)
		return console.error(err);

	return console.log(`server up and running on port ${port}!`);
});
