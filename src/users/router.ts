import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userModel, { User } from './model';
import { hashPassword } from '../common';
import verifyAuthToken from '../common/middlewares/verifyAuthToken';
import { TypedRequestBody } from '../common/utils/interfaces';

dotenv.config({ path: `.env` });
const router = express.Router();

router.get('/', verifyAuthToken, async (_req, res) => {
    try {
        const data = await userModel.index();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({
            error,
            message: `Something went wrong with the server. Please try again!`,
        });
    }
});

router.get('/:id', verifyAuthToken, async (req, res) => {
    const { id } = req.params;
    const numberId = +id;
    if (isNaN(numberId)) {
        res.status(400).send(
            `Please insert a valid id value! It should be a string numeric only value!`
        );
        return;
    }

    try {
        const data = await userModel.show(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({
            error,
            message: `Something went wrong with the server. Please try again!`,
        });
    }
});

router.post(
    '/create',
    async (
        req: TypedRequestBody<{
            firstName: string;
            lastName: string;
            userName: string;
            password: string;
        }>,
        res
    ) => {
        const { firstName, lastName, userName, password } = req.body;

        if (
            !firstName ||
            typeof firstName !== 'string' ||
            !lastName ||
            typeof lastName !== 'string' ||
            !userName ||
            typeof userName !== 'string' ||
            !password ||
            typeof password !== 'string'
        ) {
            res.status(400).send(
                'You must provide string values first name, last name, username and password!'
            );
            return;
        }

        const isUserNameTaken = await userModel.isUserNameTaken(userName);
        if (isUserNameTaken) {
            return res.status(400).json('Username already exists');
        }

        try {
            const cryptedPassword = hashPassword(password);

            const user: User = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: cryptedPassword,
            };

            const newUser = await userModel.create(user);
            const token = jwt.sign(
                { user: newUser },
                process.env.TOKEN_SECRET as string
            );
            res.json(token);
        } catch (error) {
            res.status(500).json({
                error,
                message: `Something went wrong with the server. Please try again!`,
            });
        }
    }
);

export default router;
