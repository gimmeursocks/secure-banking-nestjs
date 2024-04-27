import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { EncryptionService } from '../encryption/encryption.service'
import { UserController } from './user.controller';
import { BankAccountService } from 'src/banks/bank-account/bank-account.service';

@Module({
    providers: [UserService, EncryptionService,BankAccountService],
    controllers: [UserController],
    exports:[UserService,BankAccountService],
})
export class UsersModule {
}
