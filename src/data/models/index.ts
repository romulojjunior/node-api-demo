'use strict';

import { Sequelize } from 'sequelize';
import ApiKey from './apikey';
import User from './user';
import Story from './story';
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
Story.load(db);

// Associate All Models
User.associate(db);
ApiKey.associate(db);
Story.associate(db);

export { User, ApiKey, Story };

export default db;