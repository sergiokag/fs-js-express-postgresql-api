import express from 'express';
import productModel from './models';

const router = express.Router();

router.get('/', async (_req, res) => {
    const data = await productModel.index();
    res.status(200).send(data);
});

export default router;
