import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from '../local-strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';

@Module({
  imports:[UsersModule,PassportModule],
  providers: [AuthService,LocalStrategy,UserService],
  controllers: [AuthController]
})
export class AuthModule {}
