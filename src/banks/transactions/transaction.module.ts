import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/users/user.service';
import { BankAccountService } from '../bank-account/bank-account.service';

@Module({
  providers: [
    TransactionService,
    EncryptionService,
    UserService,
    BankAccountService,
  ],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
