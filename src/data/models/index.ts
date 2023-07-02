'use strict';

import { Sequelize } from 'sequelize';
import ApiKey from './apikey';
import User from './user';
import dbConfig from '../../../db/config.json';

const isTest = process.env.NODE_ENV === 'test';
const databaseName  =  isTest ? 'test' : 'development';

const currentConfig = dbConfig[databaseName];
const db = new Sequelize({
  "dialect": "sqlite",
  "storage": currentConfig.storage
});

// Load all models

User.load(db);
ApiKey.load(db);

// Associate All Models
User.associate(db);
ApiKey.associate(db);

export { User, ApiKey };

export default db;