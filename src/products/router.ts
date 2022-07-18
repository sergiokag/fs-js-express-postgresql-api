import express from 'express';
import verifyAuthToken from '../common/middlewares/verifyAuthToken';
import productModel, { Product } from './model';

const router = express.Router();

router.get('/', async (_req, res) => {
    const data = await productModel.index();
    res.status(200).send(data);
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
    const data = await productModel.show(id);
    res.status(200).send(data);
});

router.post('/create', verifyAuthToken, async (req, res) => {
    const { name, price, category } = req.body;

    if (!name || price === '') {
        res.status(400).send(
            'You must provide product name and price! Category is not mandatory!'
        );
        return;
    }

    if (isNaN(+price)) {
        return res.status(400).send('You must provide a numeric price value!');
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
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

export default router;
