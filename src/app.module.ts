import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [UsersModule, BanksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
