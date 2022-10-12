// $ npx ts-node shell.ts
import repl from 'node:repl';
import dotenv from 'dotenv';
dotenv.config();

const context = {
  port: process.env.PORT ?? 8080,
};

const r = repl.start('> ');
Object.defineProperty(r.context, 'context', {
  configurable: false,
  enumerable: true,
  value: context
});