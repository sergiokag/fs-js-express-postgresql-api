import express from 'express';
import dotenv from 'dotenv';
import verifyAuthToken from '../common/middlewares/verifyAuthToken';
import { TypedRequestBody } from '../common/utils/interfaces';

import orderModel from './model';
import { userModel } from '../users';
import productModel from '../products/model';

dotenv.config({ path: `.env` });
const router = express.Router();

router.get('/user/:userId', verifyAuthToken, async (req, res) => {
    const data = await orderModel.showCurrentOrder(req.params.userId);
    if (data.length) {
        return res.status(200).send(data);
    }
    return res.status(200).send({
        message: 'No current orders where found!',
    });
});

router.post(
    '/add-product',
    verifyAuthToken,
    async (
        req: TypedRequestBody<{
            userId: number;
            productId: number;
            quantity: number;
            status: 'active' | 'complete';
        }>,
        res
    ) => {
        try {
            const { userId, productId, quantity, status } = req.body;

            if (!userId || isNaN(+userId)) {
                return res
                    .status(400)
                    .json('Invalid userId input! Must be a numeric value!');
            }

            const doesUserExist = await userModel.show(userId.toString());
            if (!doesUserExist.length) {
                return res
                    .status(400)
                    .json('Invalid userId input! User does not exist!');
            }

            if (!productId || isNaN(+productId)) {
                return res
                    .status(400)
                    .json('Invalid productId input! Must be a numeric value!');
            }

            const doesProductExist = await productModel.show(
                productId.toString()
            );
            if (!doesProductExist.length) {
                return res
                    .status(400)
                    .json('Invalid productId input! Product does not exist!');
            }

            if (
                !quantity ||
                isNaN(+quantity) ||
                quantity < 1 ||
                quantity > 99
            ) {
                return res
                    .status(400)
                    .json(
                        'Please insert a valid numeric for quantity! Must be greater than zero and less than 100!'
                    );
            }

            if (status !== 'active' && status !== 'complete') {
                return res
                    .status(400)
                    .json('Status must be active or complete!');
            }
            const data = await orderModel.create(
                quantity,
                status,
                userId,
                productId
            );
            res.status(200).send(data);
        } catch (err) {
            throw err;
        }
    }
);

export default router;
