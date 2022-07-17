import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { BCRYPT_PEPPER } = process.env;
const saltRounds = 10;

const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password + BCRYPT_PEPPER, salt);
    return hash;
};

export default hashPassword;
