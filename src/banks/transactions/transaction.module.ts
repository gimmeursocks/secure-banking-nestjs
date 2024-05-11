import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/users/user.service';
import { BankAccountService } from '../bank-account/bank-account.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  providers: [TransactionService, BankAccountService, EncryptionService, UserService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
