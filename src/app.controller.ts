import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { BankAccount } from './banks/bank-account/bank-account.entity';
import { Transaction } from './banks/transactions/transaction.entity';
import { UserService } from './users/user.service';
import { EncryptionService } from './encryption/encryption.service';
import { BankAccountService } from './banks/bank-account/bank-account.service';
import { response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private encryptionService: EncryptionService,
    private bankservice: BankAccountService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('make')
  makeAcc(
    @Query('account_num') account_num: string,
    @Query('balance') balance: string,
  ): any {
    return BankAccount.create({
      account_num: account_num,
      balance: balance,
    });
  }

  @Post('signup')
  async makeUser(@Body() req: any): Promise<any> {
    console.log(req);
    const user = await this.userService.createUser(req);
    if (!user) {
      return response.status(500).send("User creation failed");
    }
    return response.status(200).send(user);
  }

  @Post('ttt')
  async enc(@Body() req: any): Promise<any> {
    return this.encryptionService.encryptData(req.email);
  }

  @Post('check')
  async check(@Body() req: any): Promise<any> {
    return this.bankservice.CreateAccount(req);
  }

  @Post('test')
  async test(@Body() req: any): Promise<any> {
    return this.userService.findUserByEmail(req.email);
  }

  @Post('bos')
  async bob(@Body() req: any): Promise<any> {
    return this.bankservice.findByNum(req.account_num);
  }
}
