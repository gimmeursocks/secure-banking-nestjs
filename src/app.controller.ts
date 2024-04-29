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
    private bankservice: BankAccountService,
    private transactionService: TransactionService,
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
  async makeUser(@Body() userData: any): Promise<any> {
    try {
      console.log(userData);
      const user = await this.userService.createUser(userData);
      if (!user) {
        throw new HttpException(
          'User creation failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
