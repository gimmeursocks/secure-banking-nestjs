import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});
