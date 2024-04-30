import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../../encryption/encryption.service';
import { Transaction } from './transaction.entity';
import { UserService } from 'src/users/user.service';
import { BankAccountService } from '../bank-account/bank-account.service';
import { Op } from 'sequelize';

@Injectable()
export class TransactionService {
  constructor(
    private encryptionService: EncryptionService,
    private userService: UserService,
    private bankService: BankAccountService,
  ) {}


  async makeTransaction(transData: any): Promise<Transaction> {
    const sender = await this.userService.findUserByEmail(transData.sender);
    const receiver = await this.userService.findUserByEmail(transData.receiver);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const bankAccSender = await this.bankService.findByPlainNum(sender.account_num);
    const bankAccReciever = await this.bankService.findByPlainNum(receiver.account_num);

    const amount = this.encryptionService.decryptData(transData.amount);

    if (parseFloat(bankAccSender.balance) < parseFloat(amount)) {
      return null;
    }
    const recieverMoney =
      parseFloat(bankAccReciever.balance) + parseFloat(amount);
    const senderMoney = parseFloat(bankAccSender.balance) - parseFloat(amount);

    const transaction = await Transaction.create(transData);

    await this.bankService.updateByNum(
      bankAccReciever.account_num,
      recieverMoney.toString(),
    );
    await this.bankService.updateByNum(
      bankAccSender.account_num,
      senderMoney.toString(),
    );
    return transaction;
  }

  async viewTransactions(email: string): Promise<Transaction[]> {
    try {
      const transactions = await Transaction.findAll({
        where: {
          [Op.or]: [{ sender: email }, { receiver: email }],
        },
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  async viewAllTransactions(): Promise<Transaction[]> {
    try {
      const transactions = await Transaction.findAll();
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
