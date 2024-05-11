import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/users/user.service';
import { TransactionService } from '../transactions/transaction.service';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';

@Module({
  providers: [BankAccountService, TransactionService, EncryptionService, UserService],
  controllers: [BankAccountController],
  exports: [BankAccountService]
})
export class BankAccountModule {}
