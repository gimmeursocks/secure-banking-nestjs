import { TransactionService } from './transaction.service'
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('trans')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async makeTrans(@Body() req: any): Promise<any> {
    return this.transactionService.makeTransaction(req);
  }

  @Post('view')
  async viewTrans(@Body() req: any): Promise<any> {
    return this.transactionService.viewTransactions(req.email);
  }
}
