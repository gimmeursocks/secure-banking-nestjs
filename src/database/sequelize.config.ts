import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;

export const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: databaseHost,
  dialect: 'mysql',
});
