import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../../encryption/encryption.service';
import { BankAccount } from './bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(private encryptionService: EncryptionService) {}

  async CreateAccount(account: any): Promise<BankAccount> {
    try {
      const encryptedUserData: any = {};
      for (const key in account) {
        if (Object.prototype.hasOwnProperty.call(account, key)) {
          encryptedUserData[key] = this.encryptionService.encryptData(
            account[key],
          );
        }
      }

      const bank = await BankAccount.create(encryptedUserData);
      return bank;
    } catch (error) {
      throw error;
    }
  }

  async findByNum(num: string): Promise<BankAccount | null> {
    try {
      const encryptedNum = this.encryptionService.encryptData(num);
      const existingAccount = await BankAccount.findOne({
        where: { account_num: encryptedNum },
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
}
