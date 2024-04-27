import { User } from './user.entity';
import { UserService } from './user.service';
import { EncryptionService } from '../encryption/encryption.service'
import { BankAccount } from '../banks/bank-account/bank-account.entity';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): string[] {
    return this.userService.findAll();
  }

}
