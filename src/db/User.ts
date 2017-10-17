import pool from './connection';
import { hashString } from '../utils/hash';
import * as _ from 'lodash';

export interface UserModel {
    id: number,
    first_name: string,
    last_name: string,
    bio: string,
    email: string,
    passsword: string,
    created: string,
    updated: string
}

export interface UserData {
    firstName: string,
    lastName?: string,
    bio?: string,
    email: string,
    password: string
}

const createUsersTable = () => {
    return pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50),
        bio text,
        email VARCHAR(255) NOT NULL ,
        password VARCHAR(500) NOT NULL,
        created date,
        updated date,
        CONSTRAINT unique_mail UNIQUE(email)
    )`);
};

export const createUser = (data: UserData) => {
    let {
        firstName: first_name,
        lastName: last_name,
        bio,
        email,
        password
    } = data;

    return isUserEmailFree(email)
        .then((isFree: boolean) => {

            if (!isFree)
                throw 'email already exists!';

            return hashString(password)
        })
        .then((hashedPass: string) => {
            return pool.query('INSERT INTO users(first_name, ' +
                'last_name, ' +
                'bio, ' +
                'email, ' +
                'password,' +
                'created, ' +
                'updated) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)', [
                first_name,
                last_name,
                bio,
                email,
                hashedPass
            ]);
        })
        .then((created) => {
            console.pg_log('User created');

            return {
                isError: false,
                message: 'user created!'
            };
        })
        .catch((err) => {
            console.pg_error(err);
            return {
                isError: true,
                message: err
            };
        });
};

export const getUserById = (id: number) => {
    return pool.query('SELECT * FROM users WHERE id = $1', [id])
        .then((result) => {
            return result.rows[0];
        })
        .catch((err) => {
            console.pg_error(err);
        });
};

// limit = 10, if you want next n users, pass page param and limit param for change n
export const selectAllUsers = (limit?: number, page?: number) => {
    return pool.query('SELECT * FROM users LIMIT $1 OFFSET $2', [limit || 10, (page || 0) * 10])
        .then((res) => {
            return { isError: false, data: res.rows };
        })
        .catch((err) => {
            console.pg_error(err);

            return { isError: true, message: err };
        });
};



export const selectUserByEmail = (email: string) => {
    return pool.query('SELECT * FROM users WHERE email=$1', [email])
        .then((res) => {
            return _.get(res, ['rows', 0]);
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
};


(function syncUserTable() {
    createUsersTable()
        .then((res) => {
            console.pg_log(`User's table synced`);
        })
        .catch((err) => {
            console.pg_error(err);
        });
})();

function isUserEmailFree(mail: string): Promise<boolean> {
    return selectUserByEmail(mail)
        .then((res) => {
            return !res;
        })
        .catch((err) => {
           console.log(err);

            return false;
        });
}
