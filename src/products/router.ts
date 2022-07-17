import express from 'express';
import productModel from './models';

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

export default router;
