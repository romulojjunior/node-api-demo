// eslint-disable-next-line no-undef
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  overrides: [
    { files: ['index.ts', 'src/**/*.ts'] },
  ],
  rules: {
    '@typescript-eslint/semi': 2,
  }
};