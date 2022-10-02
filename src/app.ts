import express, { Express, Request, Response } from 'express';
import LoggerUtils from './utils/logger-utils';


const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  LoggerUtils.d('Headers', res.getHeaders())
  res.send('Express + TypeScript Server');
});

export default app;