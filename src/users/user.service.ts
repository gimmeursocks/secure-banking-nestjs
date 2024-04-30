import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EncryptionService } from '../encryption/encryption.service';
import { BankAccount } from '../banks/bank-account/bank-account.entity';
import { BankAccountService } from '../banks/bank-account/bank-account.service';

@Injectable()
export class UserService {
  constructor(
    private encryptionService: EncryptionService,
    private bankservice: BankAccountService,
  ) {}

  findAll(): string[] {
    return ['User 1', 'User 2', 'User 3'];
  }

  async createUser(userData: any): Promise<User> {
    try {
      if (userData.account_num) {
        const existingUser = await this.bankservice.findByNum(
          userData.account_num,
        );
        if (existingUser) {
          const user = await User.create(userData);
          return user;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      console.log(email);
      const user = await User.findOne({ where: { email: email } });

      if (user) {
        for (const key in user.dataValues) {
          if (
            user.dataValues[key] &&
            key != 'password' &&
            key != 'role' &&
            key != 'updatedAt' &&
            key != 'createdAt'
          ) {
            user.dataValues[key] = this.encryptionService.decryptData(
              user[key],
            );
          }
        }
      }

      return user.dataValues;
    } catch (error) {
      throw error;
    }
  }

  async updateUserByEmail(
    email: string,
    updateData: Partial<User>,
  ): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        await user.update(updateData);
        return user;
      } else {
        return null; // User not found
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteUserByEmail(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        await user.destroy();
        return true;
      } else {
        return false; // User not found
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<any> {
    try {
      const users = await User.findAll();
      if (users) {
        return users;
      } else {
        return false; // User not found
      }
    } catch (error) {
      throw error;
    }
  }

  async checkBalance(email: string): Promise<any> {
    try {
      const userAccount = this.findUserByEmail(this.encryptionService.encryptData(email));
      const existingAccount = await BankAccount.findOne({
        where: { account_num: this.encryptionService.encryptData((await userAccount).account_num) },
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
      return existingAccount.dataValues.balance;
    } catch (error) {
      throw error;
    }
  }
}
