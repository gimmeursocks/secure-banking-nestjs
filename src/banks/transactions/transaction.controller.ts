import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { EncryptionService } from 'src/encryption/encryption.service';
import { TransactionService } from './transaction.service';

@Controller('trans')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private encryptionService: EncryptionService,
  ) {}

  @Post()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async makeTrans(@Request() req: any): Promise<any> {
    req.body['sender'] = this.encryptionService.encryptData(req.user.email);
    return this.transactionService.makeTransaction(req.body);
  }

  @Post('view')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async viewTrans(@Request() req: any): Promise<any> {
    const email = this.encryptionService.encryptData(req.user.email);
    return this.transactionService.viewTransactions(email);
  }

  @Post('admin/view')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async viewAllTrans(@Request() req: any): Promise<any> {
    return this.transactionService.viewAllTransactions();
  }
}
