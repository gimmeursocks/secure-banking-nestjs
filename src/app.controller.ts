import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize';
import { User } from './entity/user.entity';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get("user/:id")
  getData(@Param('id') id: number) : any {
    let sequelize: Sequelize;
    sequelize = new Sequelize('test', 'root', 'root', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });

    return User.findByPk(id);
  }

  @Get("make")
  makeUser(@Query('email') email : string, @Query('password') password : string) : any{
    return User.create({
      email : email,
      password : password
    })
  }
}
