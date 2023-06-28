// $ npx ts-node shell.ts
import repl from 'node:repl';
import dotenv from 'dotenv';
import db from './src/domain/models';
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