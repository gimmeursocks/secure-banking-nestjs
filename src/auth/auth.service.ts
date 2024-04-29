import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();
    if (user.password != password)
      throw new UnauthorizedException();
    return user;
  }

  async generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        sub: user.email,
        username: user.username,
        role: user.role,
      },{
        expiresIn: '30 days'
      }),
      role: user.role,
    };
  }
}
