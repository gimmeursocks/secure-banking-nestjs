import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize';
import { User } from './users/user.entity';
import { BankAccount } from './banks/bank-account/bank-account.entity';
import { Transaction } from './banks/transactions/transaction.entity';
import { UserService } from './users/user.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService: UserService,) {}
  
  @Get()
  getHello(): string {
    Transaction.name;
    return this.appService.getHello();
  }

  @Get("trans/:acc_num")
  getData(@Param('acc_num') acc_num: string): any {
    return BankAccount.findByPk(acc_num);
  }

  @Get("make")
  makeAcc(@Query('account_num') account_num: string, @Query('balance') balance: string) : any{
    return BankAccount.create({
      account_num : account_num,
      balance : balance
    })
  }

  @Post("signup")
  async makeUser(@Body() req: any): Promise<any> {
    const existingUser = await BankAccount.findByPk(req.AccountNum);
    if(!existingUser) {
      return "User not found";
    }
    const user = await User.create(req);
    if(!user){
      return "a7a";
    }
    return user;
  }

  @Post("yarab")
  async makeUse(@Body() req: any): Promise<any> {
    const user = await this.userService.findUserByEmail(req.email)
    if(!user){
      return "a7a";
    }
    return user;
  }

}
