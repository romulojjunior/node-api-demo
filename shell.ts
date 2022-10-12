import repl from 'node:repl';

const context = {
  message: 'message',
};

const r = repl.start('> ');
Object.defineProperty(r.context, 'context', {
  configurable: false,
  enumerable: true,
  value: context
});