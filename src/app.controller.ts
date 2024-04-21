import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize';
import { User } from './entity/user.entity';
import { Bank } from './entity/bank.entity';
import { Transaction } from './entity/transaction.entity';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("reset")
  resetTables() : any {
    User.sync({force : true});
    Bank.sync({force : true});
    Transaction.sync({force : true});
  }
  
  @Get("trans/:id")
  getData(@Param('id') id: number) : any {
    let sequelize: Sequelize;
    sequelize = new Sequelize('test', 'root', 'root', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });

    return Transaction.findByPk(id);
  }

  @Get("make")
  makeUser(@Query('email') email: string, @Query('amount') amount: number) : any{
    return Transaction.create({
      email : email,
      amount : amount
    })
  }
}
