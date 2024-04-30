import { Roles } from 'src/auth/roles.decorator';
import { BankAccountService } from './bank-account.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('bank')
export class BankAccountController {
  constructor(private bankAccountService: BankAccountService) {}

  @Post('create')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createAccount(@Request() req: any): Promise<any> {
    return this.bankAccountService.CreateAccount(req.body);
  }
  
  @Post('view')
  async viewAccount(@Body() req: any): Promise<any> {
    return this.bankAccountService.findByNum(req.account_num);
  }
}
