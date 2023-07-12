// $ npx ts-node shell.ts
import repl from 'node:repl';
import dotenv from 'dotenv';
import db from '../src/data/models';
import AuthenticateUserUC from '../src/domain/usecases/auth/authenticate-user-uc';
import CreateApikeyUC from '../src/domain/usecases/auth/create-apikey-uc';
import CreateUserUC from '../src/domain/usecases/user/create-user-uc';
import DestroyUserUC from '../src/domain/usecases/user/destroy-user-uc';
dotenv.config();

const r = repl.start('> ');
Object.defineProperty(r.context, 'ctx', {
  configurable: false,
  enumerable: true,
  value: {
    port: process.env.PORT ?? 8080,
  }
});

Object.defineProperty(r.context, 'db', {
  configurable: false,
  enumerable: true,
  value: db
});

Object.defineProperty(r.context, 'uc', {
  configurable: false,
  enumerable: true,
  value: {
    CreateUserUC,
    DestroyUserUC,
    AuthenticateUserUC, 
    CreateApikeyUC 
  }
});