yarn init

yarn add express dotenv 
yarn add --dev typescript @types/express @types/node

yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint

npx tsc --init

# package.json
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "npx tsc --watch"
  }
}


# .eslintrc.cjs
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};