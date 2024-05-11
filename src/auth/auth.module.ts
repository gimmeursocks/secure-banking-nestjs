import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { UserService } from 'src/users/user.service';
import { UsersModule } from 'src/users/users.module';
import { EncryptionService } from 'src/encryption/encryption.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local-strategy';
import { RolesGuard } from './roles.guard';

config();
const secret = process.env.ACCESS_TOKEN_SECRET;

@Module({
  imports: [UsersModule, PassportModule, 
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: "30 days" },
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy, EncryptionService, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {}
