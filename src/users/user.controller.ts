import { UserService } from './user.service';
import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

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

}
