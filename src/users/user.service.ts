import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {EncryptionService} from '../encryption/encryption.service'

@Injectable()
export class UserService {
  constructor(private encryptionService: EncryptionService) {}

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      // Encrypt each section of userData before storing in the database
      const encryptedUserData: any = {};
      for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
          if (key === 'password') {
            // If the key is 'password', hash the password
            encryptedUserData[key] = this.encryptionService.hashPassword(userData[key]);
          } else {
            // For other fields, use AES encryption
            encryptedUserData[key] = this.encryptionService.encryptData(JSON.stringify(userData[key]));
          }
        }
      }
      const user = await User.create(encryptedUserData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      // Encrypt the provided email before searching
      const encryptedEmail = this.encryptionService.encryptData(email);
      console.log(encryptedEmail);
      const user = await User.findOne({ where: { email: encryptedEmail } });
      
        //Decrypt each section of user data
        for (const key in user) {
          if (Object.prototype.hasOwnProperty.call(user, key)) {
            if (key !== 'email') {
              const decryptedData = this.encryptionService.decryptData(user[key]);
              user[key] = decryptedData;
            }
          }
        return user;
      }
  

    } catch (error) {
      throw error;
    }
  }
  
  async updateUserByEmail(email: string, updateData: Partial<User>): Promise<User | null> {
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
