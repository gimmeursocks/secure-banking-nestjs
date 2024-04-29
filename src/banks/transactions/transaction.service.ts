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

  async makeTransaction(
    senderEmail: string,
    receiverEmail: string,
    amount: string,
    comment: string,
  ): Promise<Transaction> {
    // Retrieve sender and receiver users
    const sender = await this.userService.findUserByEmail(senderEmail);
    const receiver = await this.userService.findUserByEmail(receiverEmail);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }
    const bankAccSender = await this.bankService.findByNum(sender.account_num);
    const bankAccReciver = await this.bankService.findByNum(
      receiver.account_num,
    );
    if (parseFloat((await bankAccSender).balance) < parseFloat(amount)) {
      return null;
    }
    const reciverMoney =
      parseFloat((await bankAccReciver).balance) + parseFloat(amount);
    const senderMoney =
      parseFloat((await bankAccSender).balance) - parseFloat(amount);

    // Create a new transaction record
    const transaction = await Transaction.create({
      sender: sender.email,
      receiver: receiver.email,
      amount,
      comment,
    });

    await this.bankService.updateByNum(
      bankAccReciver.account_num,
      reciverMoney.toString(),
    );
    await this.bankService.updateByNum(
      bankAccSender.account_num,
      senderMoney.toString(),
    );
    return transaction;
  }

  async viewTransactions(email: string): Promise<Transaction[]> {
    try {
      // Find all transactions where the sender or receiver email matches the user's email
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
}
