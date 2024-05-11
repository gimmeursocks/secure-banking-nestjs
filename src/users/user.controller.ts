import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  bankAccountService: any;
  constructor(private userService: UserService) {}

  @Post('signup')
  async makeUser(@Body() userData: any): Promise<any> {
    try {
      console.log(userData);
      const user = await this.userService.createUser(userData);
      if (!user) {
        throw new HttpException('User creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('admin/users')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async allUsers(@Request() req: any): Promise<any> {
    return this.userService.getAllUsers();
  }

  @Post('bank/check')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async checkBalance(@Request() req: any): Promise<any> {
    return this.userService.checkBalance(req.user.email);
  }
}
