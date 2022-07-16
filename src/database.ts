import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config({ path: `.env` });
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env;

const database = ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB;
const connectionDB = new pg.Pool({
    host: POSTGRES_HOST,
    database,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    max: 50,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000,
});

export default connectionDB;
