declare interface Console {
    pg_log: Function,
    pg_error: Function
}

console.pg_log = (text: string) => {
    console.log('\x1b[36m%s\x1b[0m', `\tpostgres log:\t ${text}`);
};

console.pg_error = (text: string) => {
    console.log('\x1b[31m%s\x1b[0m', `\tpostgres error:\t ${text}`);
};
