import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/users/user.service';
import { BankAccountController } from './bank-account/bank-account.controller';
import { BankAccountService } from './bank-account/bank-account.service';
import { TransactionController } from './transactions/transaction.controller';
import { TransactionService } from './transactions/transaction.service';

@Module({
  providers: [BankAccountService, TransactionService, UserService, EncryptionService],
  controllers: [BankAccountController, TransactionController],
  exports: [BankAccountService, TransactionService],
})
export class BanksModule {}
