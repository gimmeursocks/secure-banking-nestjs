import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { BankAccount } from './banks/bank-account/bank-account.entity';
import { Transaction } from './banks/transactions/transaction.entity';
import { UserService } from './users/user.service';
import { EncryptionService } from './encryption/encryption.service';
import { BankAccountService } from './banks/bank-account/bank-account.service';
import { TransactionService } from './banks/transactions/transaction.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private encryptionService: EncryptionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('enc')
  async enc(@Body() req: any): Promise<any> {
    return this.encryptionService.encryptData(req.data);
  }

  @Post('test')
  async test(@Body() req: any): Promise<any> {
    return this.userService.findUserByEmail(req.email);
  }
}
