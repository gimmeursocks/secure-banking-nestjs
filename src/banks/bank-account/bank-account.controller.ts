import { Roles } from 'src/auth/roles.decorator';
import { BankAccountService } from './bank-account.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';

@Controller('bank')
export class BankAccountController {
  constructor(private bankAccountService: BankAccountService) {}

  @Roles(Role.Admin)
  @Post('create')
  async createAccount(@Body() req: any): Promise<any> {
    return this.bankAccountService.CreateAccount(req);
  }

  @Post('view')
  async viewAccount(@Body() req: any): Promise<any> {
    return this.bankAccountService.findByNum(req.account_num);
  }
}
