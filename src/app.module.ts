import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BanksModule } from './banks/banks.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './users/user.service';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports: [UsersModule, BanksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService, EncryptionService],
})
export class AppModule {}
