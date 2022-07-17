import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { BCRYPT_PEPPER } = process.env;

const comparePasswords = (
    passwordToEncrypt: string,
    toComparePassword: string
): boolean => {
    return bcrypt.compareSync(
        passwordToEncrypt + BCRYPT_PEPPER,
        toComparePassword
    );
};

export default comparePasswords;
