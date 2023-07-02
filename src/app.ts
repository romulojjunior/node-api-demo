import express, { Express, Request, Response } from 'express';
import AuthRouter from './api/auth/user-router';


const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/auth', new AuthRouter().create());

export default app;
