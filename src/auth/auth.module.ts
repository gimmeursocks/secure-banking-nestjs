import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt-strategy';
import { EncryptionService} from '../encryption/encryption.service';
import { RolesGuard } from './roles.guard';

config();
const secret = process.env.ACCESS_TOKEN_SECRET;

@Module({
  imports:[UsersModule,PassportModule,JwtModule.register({
    secret:secret,
    signOptions: {expiresIn:50},
  })],
  providers: [AuthService,LocalStrategy,UserService,JwtStrategy, EncryptionService,RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {}
