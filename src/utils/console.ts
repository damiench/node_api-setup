import * as util from 'util';

console.pg_log = (text: any) => {
    console.log('\x1b[36m%s\x1b[0m', `\tpostgres log:\t ${util.inspect(text, { depth: null })}`);
};

console.pg_error = (text: any) => {
    console.log('\x1b[31m%s\x1b[0m', `\tpostgres error:\t ${util.inspect(text, { depth: null })}`);
};
