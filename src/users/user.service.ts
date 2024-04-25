import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
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
