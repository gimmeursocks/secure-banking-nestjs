import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { BankAccountService } from './bank-account.service';

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
