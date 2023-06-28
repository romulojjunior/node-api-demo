import dotenv from 'dotenv';
import app from './app';
import LoggerUtils from './utils/logger-utils';

dotenv.config();

const port = process.env.PORT ?? 8080;
app.listen(port, () => {
  LoggerUtils.d(`⚡️[server]: http://localhost:${port}`);
});
