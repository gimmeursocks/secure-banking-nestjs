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
      const encryptedUserData: any = {};
      for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
          if (key === 'password') {
            encryptedUserData[key] = this.encryptionService.hashPassword(
              userData[key],
            );
          } else if (key === 'role') {
            encryptedUserData[key] = userData[key];
          } else {
            encryptedUserData[key] = this.encryptionService.encryptData(
              userData[key],
            );
          }
        }
      }
      if (userData.account_num) {
        const existingUser = await this.bankservice.findByNum(
          userData.account_num,
        );
        if (existingUser) {
          const user = await User.create(encryptedUserData);
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
      const encryptedEmail = this.encryptionService.encryptData(email);
      const user = await User.findOne({ where: { email: encryptedEmail } });

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
}
