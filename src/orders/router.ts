import express from 'express';
import dotenv from 'dotenv';

import orderModel from './model';
import verifyAuthToken from '../common/middlewares/verifyAuthToken';

dotenv.config({ path: `.env` });
const router = express.Router();

router.get('/user/:userId', verifyAuthToken, async (req, res) => {
    const data = await orderModel.show(req.params.userId);
    res.status(200).send(data);
});

router.post('/add-product', verifyAuthToken, async (req, res) => {
    try {
        const { userId, productId, quantity, status } = req.body;

        if (!userId || isNaN(+userId)) {
            return res
                .status(400)
                .json('Invalid userId input! Must be a numeric value!');
        }

        if (!productId || isNaN(+productId)) {
            return res
                .status(400)
                .json('Invalid productId input! Must be a numeric value!');
        }

        if (!quantity || isNaN(+quantity) || quantity < 1 || quantity > 99) {
            return res
                .status(400)
                .json(
                    'Please insert a valid numeric for quantity! Must be greater than zero and less than 100!'
                );
        }

        if (status !== 'active' || status !== 'complete') {
            return res.status(400).json('Status must be active or complete!');
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
});

export default router;
