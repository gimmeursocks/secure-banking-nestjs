import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any): Promise<any> {
    return this.authService.generateToken(req.user);
  }

  @Roles(Role.Admin)
  @Post('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async test(@Request() req: any): Promise<any> {
    return req.user;
  }
}
