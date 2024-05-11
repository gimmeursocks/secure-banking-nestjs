import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from './app.module';
import { BankAccount } from './banks/bank-account/bank-account.entity';
import { Transaction } from './banks/transactions/transaction.entity';
import { User } from './users/user.entity';

const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5050',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    credentials: true,
  };
  app.enableCors(corsOptions);

  const sequelize = new Sequelize(
    databaseName,
    databaseUser,
    databasePassword,
    {
      host: databaseHost,
      dialect: 'mysql',
    },
  );

  sequelize.addModels([BankAccount, User, Transaction]);

  await sequelize.sync();

  await app.listen(3000);
}
bootstrap();
