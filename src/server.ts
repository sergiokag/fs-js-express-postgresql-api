import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectionDB from './database';

const app: express.Application = express();
const port = 3000;
const address = `0.0.0.0:${port}`;

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
    //   await connection.connect();
    //   const results = await connection.query('SELECT * FROM books');
    //   connection.end();
    console.log(connectionDB);
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
