import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes as productRoutes } from './products';

const app: express.Application = express();
const port = 3000;
const address = `0.0.0.0:${port}`;

app.use(cors());
app.use(bodyParser.json());

app.use('/products', productRoutes);

app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
