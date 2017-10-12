import * as pg from 'pg';
require('dotenv').config();

const {
    PGUSER,
    PGHOST,
    PGPASSWORD,
    PGDATABASE,
    PGPORT
} = process.env;

const pool = new pg.Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: parseInt(PGPORT),
});

const syncAllTables = () => {
    console.log('\n\npg tables sync:')
    require('./User');
};

export default pool;

(function test_connection() {
    pool.query('Select now()')
        .then((res) => {
            console.pg_log('Connection to database established');

            syncAllTables();
        })
        .catch((err) => {
            if (err) {
                pool.end();
                console.error(err);
                process.exit(-1);
            }
        });
})();
