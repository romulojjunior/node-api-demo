yarn init

yarn add express dotenv 
yarn add --dev typescript @types/express @types/node

npx tsc --init

{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "npx tsc --watch"
  }
}