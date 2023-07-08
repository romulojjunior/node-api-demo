import express, { Express, Request, Response } from 'express';
import UserAccountRouter from './api/v1/account/user-account-router';


const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/v1/account', new UserAccountRouter().create());

export default app;
