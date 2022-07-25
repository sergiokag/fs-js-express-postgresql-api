import express from 'express';
import verifyAuthToken from '../common/middlewares/verifyAuthToken';
import { TypedRequestBody } from '../common/utils/interfaces';
import productModel, { Product } from './model';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const data = await productModel.index();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({
            error,
            message: `Something went wrong with the server. Please try again!`,
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const numberId = +id;
    if (isNaN(numberId)) {
        res.status(400).send(
            `Please insert a valid id value! It should be a string numeric only value!`
        );
        return;
    }

    try {
        const data = await productModel.show(id);
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
    verifyAuthToken,
    async (
        req: TypedRequestBody<{
            name: string;
            price: number;
            category?: string;
        }>,
        res
    ) => {
        const { name, price, category } = req.body;

        if (!name || price === 0) {
            res.status(400).send(
                'You must provide a valid product name and a valid price(greater than zero)!  Category is not mandatory!'
            );
            return;
        }

        if (isNaN(+price)) {
            return res
                .status(400)
                .send('You must provide a numeric price value!');
        }

        try {
            const product: Product = {
                name,
                price,
                category,
            };

            const newProduct = await productModel.create(product);
            if (newProduct) {
                res.json({ message: 'New product created successfully!' });
            }
        } catch (error) {
            res.status(500).json({
                error,
                message: `Something went wrong with the server. Please try again!`,
            });
        }
    }
);

export default router;
