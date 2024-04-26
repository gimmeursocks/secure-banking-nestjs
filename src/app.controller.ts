import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { BankAccount } from './banks/bank-account/bank-account.entity';
import { Transaction } from './banks/transactions/transaction.entity';
import { UserService } from './users/user.service';
import  {EncryptionService } from './encryption/encryption.service'



@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService: UserService,private encryptionService: EncryptionService) {}
  
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
    const user = await this.userService.createUser(req);
    if(!user){
      return "a7a";
    }
    return user;
  }
  
  @Post("ttt")
  async enc(@Body() req: any): Promise<any> {
    return this.encryptionService.encryptData(req.email);
  }

  @Post("check")
  async check(@Body() req: any): Promise<any> {
    return this.userService.findUserByEmail(req.email);
  }

}
