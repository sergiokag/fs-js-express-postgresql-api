import express from 'express';
import dotenv from 'dotenv';

import userModel, { User } from './model';
import { hashPassword } from '../common';
import verifyAuthToken from '../common/middlewares/verifyAuthToken';
import { TypedRequestBody } from '../common/utils/interfaces';

dotenv.config({ path: `.env` });
const router = express.Router();

router.get('/', verifyAuthToken, async (_req, res) => {
    const data = await userModel.index();
    res.status(200).send(data);
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
    const data = await userModel.show(id);
    res.status(200).send(data);
});

router.post(
    '/create',
    verifyAuthToken,
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

        if (!firstName || !lastName || !userName || !password) {
            res.status(400).send(
                'You must provide first name, last name, username and password!'
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
            if (newUser) {
                res.json({ message: 'User created successfully!' });
            }
        } catch (err) {
            res.status(400);
            res.json(err);
        }
    }
);

export default router;
