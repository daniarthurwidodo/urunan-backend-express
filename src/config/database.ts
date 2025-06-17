import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'myapp_db',
  dialect: 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  models: [User], // Add your models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export default sequelize;