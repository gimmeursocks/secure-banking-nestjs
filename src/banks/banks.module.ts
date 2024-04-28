import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account/bank-account.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  providers: [BankAccountService, EncryptionService],
  controllers: [],
  exports: [BankAccountService],
})
export class BanksModule {}
