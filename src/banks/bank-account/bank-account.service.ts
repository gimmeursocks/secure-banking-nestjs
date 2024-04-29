import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../../encryption/encryption.service';
import { BankAccount } from './bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(private encryptionService: EncryptionService) {}

  async CreateAccount(account: any): Promise<BankAccount> {
    try {
      const bank = await BankAccount.create(account);
      return bank;
    } catch (error) {
      throw error;
    }
  }

  async findByNum(num: string): Promise<BankAccount | null> {
    try {
      const existingAccount = await BankAccount.findOne({
        where: { account_num: num },
      });
      if (existingAccount) {
        for (const key in existingAccount.dataValues) {
          if (
            existingAccount.dataValues[key] &&
            key != 'createdAt' &&
            key != 'updatedAt'
          ) {
            existingAccount.dataValues[key] =
              this.encryptionService.decryptData(existingAccount[key]);
          }
        }
      }
      return existingAccount.dataValues;
    } catch (error) {
      throw error;
    }
  }

  async updateByNum(num: string, balance: string): Promise<BankAccount | null> {
    try {
      const encryptedNum = this.encryptionService.encryptData(num);
      const existingAccount = await BankAccount.findOne({
        where: { account_num: encryptedNum },
      });
      if (existingAccount) {
        existingAccount.balance = this.encryptionService.encryptData(balance);
        await existingAccount.save();
        return existingAccount.dataValues;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
