import express, { Express, Request, Response } from 'express';
import UserAccountRouter from './api/v1/users/account/user-account-router';
import UserStoriesRouter from './api/v1/user/stories/user-stories-router';
import authenticateByApiKey from './api/middlewares/authenticateByApiKey';


const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/v1/users/account', UserAccountRouter);
app.use('/api/v1/user/stories', authenticateByApiKey, UserStoriesRouter);

export default app;
