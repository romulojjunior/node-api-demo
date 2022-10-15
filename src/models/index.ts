'use strict';

import { Sequelize } from 'sequelize';
import ApiKey from './apikey';
import User from './user';
// import config from '../../db/config.json';
// const env: string = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize({
  "dialect": "sqlite",
  "storage": "db/database.sqlite"
});

// Load all models
User.load(sequelize);
ApiKey.load(sequelize);

export default sequelize;
