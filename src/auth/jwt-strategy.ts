import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import { EncryptionService } from 'src/encryption/encryption.service';

config();
const secret = process.env.ACCESS_TOKEN_SECRET;

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private encryptionService: EncryptionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    return {
      email: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
