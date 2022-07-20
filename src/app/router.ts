import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { hashPassword } from '../common';
import { userModel, User } from '../users';

dotenv.config({ path: `.env` });
const router = express.Router();

router.post('/sign-up', async (req, res) => {
    const { firstName, lastName, userName, password } = req.body;

    if (!firstName || !lastName || !userName || !password) {
        res.status(400).send(
            'You must provide first name, last name, username and password!'
        );
        return;
    }

    try {
        const cryptedPassword = hashPassword(password);

        const isUserNameTaken = await userModel.isUserNameTaken(userName);
        if (isUserNameTaken) {
            return res.status(400).json('Username already exists');
        }

        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: cryptedPassword,
        };
        const newUser = await userModel.create(user);
        const token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string,
            {
                expiresIn: '600s',
            }
        );
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).send('You must provide username and password!');
        return;
    }

    try {
        const newUser = await userModel.authenticate(userName, password);
        const token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string,
            {
                expiresIn: '600s',
            }
        );
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json(err);
    }
});

export default router;
