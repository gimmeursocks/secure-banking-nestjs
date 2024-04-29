import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BanksModule } from './banks/banks.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './banks/transactions/transaction.module';
import { UserService } from './users/user.service';
import { EncryptionService } from './encryption/encryption.service';
import { TransactionService } from './banks/transactions/transaction.service';
import { BankAccountService } from './banks/bank-account/bank-account.service';

@Module({
  imports: [UsersModule, BanksModule, AuthModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService, BankAccountService, UserService, EncryptionService, TransactionService],
})
export class AppModule {}
