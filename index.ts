import dotenv from 'dotenv';
import app from './src/app';
import LoggerUtils from './src/utils/logger-utils';

dotenv.config();

const port = process.env.PORT ?? 8080;
app.listen(port, () => {
  LoggerUtils.d(`⚡️[server]: http://localhost:${port}`);
});
