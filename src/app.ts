import express, { Express, Request, Response } from 'express';
import UserAccountRouter from './api/v1/users/account/user-account-router';


const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/v1/users/account', UserAccountRouter);

export default app;
