import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BanksModule } from './banks/banks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, BanksModule, AuthModule]
})
export class AppModule {}
