import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});
