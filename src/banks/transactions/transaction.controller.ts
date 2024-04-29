import { Roles } from 'src/auth/roles.decorator';
import { TransactionService } from './transaction.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { EncryptionService } from 'src/encryption/encryption.service';

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
  @UseGuards(JwtAuthGuard)
  async viewTrans(@Request() req: any): Promise<any> {
    const email = this.encryptionService.encryptData(req.user.email);
    return this.transactionService.viewTransactions(email);
  }
}
