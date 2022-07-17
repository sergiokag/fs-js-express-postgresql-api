import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as appRouter } from './app';
import { router as productsRouter } from './products';
import { router as usersRouter } from './users';

const app: express.Application = express();
const port = 3000;
const address = `0.0.0.0:${port}`;

app.use(cors());
app.use(bodyParser.json());

app.use(appRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(port, function () {
    console.log(`...starting app on: ${address}`);
});

export default app;
