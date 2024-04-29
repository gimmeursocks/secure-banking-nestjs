import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account/bank-account.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { BankAccountController } from './bank-account/bank-account.controller';
import { TransactionController } from './transactions/transaction.controller';
import { TransactionService } from './transactions/transaction.service';

@Module({
  providers: [BankAccountService, TransactionService, EncryptionService],
  controllers: [BankAccountController, TransactionController],
  exports: [BankAccountService],
})
export class BanksModule {}
