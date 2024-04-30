import { Module } from '@nestjs/common';
import { TransactionService } from '../transactions/transaction.service';
import { TransactionController } from '../transactions/transaction.controller';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/users/user.service';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';

@Module({
  providers: [
    TransactionService,
    EncryptionService,
    UserService,
    BankAccountService,
  ],
  controllers: [BankAccountController],
  exports: [BankAccountService],
})
export class BankAccountModule {}
