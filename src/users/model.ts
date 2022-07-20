import comparePasswords from '../common/utils/comparePassword';

import connectionDB from '../database';

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

class UserModel {
    async index(): Promise<User[]> {
        try {
            const conn = await connectionDB.connect();
            const results = await connectionDB.query('SELECT * FROM users');
            conn.release();
            return results.rows;
        } catch (err) {
            throw err;
        }
    }

    async show(id: string): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users WHERE "id" = $1';
            const conn = await connectionDB.connect();
            const results = await connectionDB.query(sql, [id]);
            conn.release();
            return results.rows;
        } catch (err) {
            throw err;
        }
    }

    async create(user: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING username, password';
            const conn = await connectionDB.connect();
            const results = await connectionDB.query(sql, [
                user.firstName,
                user.lastName,
                user.userName,
                user.password,
            ]);
            conn.release();
            return results.rows[0];
        } catch (err) {
            throw err;
        }
    }

    async authenticate(userName: string, password: string): Promise<User> {
        try {
            const sql =
                'SELECT "username", "password" FROM users WHERE "username"=$1';
            const conn = await connectionDB.connect();
            const results = await connectionDB.query(sql, [userName]);
            conn.release();

            if (!results.rowCount) {
                throw new Error(
                    'Invalid username or password! Please try again'
                );
            }

            const selectedUser = results.rows[0] as User;
            const isPasswordValid = comparePasswords(
                password,
                selectedUser.password
            );

            if (isPasswordValid) {
                return selectedUser;
            }

            throw new Error('Invalid username or password! Please try again');
        } catch (err) {
            throw err;
        }
    }

    async isUserNameTaken(username: string): Promise<boolean> {
        try {
            const sql = 'SELECT * FROM users WHERE "username" = $1';
            const conn = await connectionDB.connect();
            const results = await connectionDB.query(sql, [username]);
            conn.release();
            return results.rowCount > 0;
        } catch (err) {
            throw err;
        }
    }
}

const userModel = new UserModel();
export default userModel;
