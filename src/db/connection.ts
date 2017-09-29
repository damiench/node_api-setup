import * as pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'testdbpass',
  port: 5444,
})

pool.query('Select now()', (err, res) => {
		console.log(err,res);
		pool.end();
});
