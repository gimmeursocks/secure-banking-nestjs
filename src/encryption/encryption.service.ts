import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto';
import { config } from 'dotenv';

config();

const secret = process.env.SECRET_KEY;
const fixedIV = process.env.FIXED_IV;
const encAlgo = process.env.ENC_ALGO;
const hashAlgo = process.env.HASH_ALGO;

@Injectable()
export class EncryptionService {
  private readonly secretKey: string = secret;
  private readonly fixedIV: Buffer = Buffer.from(fixedIV, 'hex');

  encryptData(data: string): any {
    const cipher = Crypto.createCipheriv(encAlgo, this.secretKey, this.fixedIV);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    return encryptedData + cipher.final('hex');
  }

  decryptData(encryptedData: any): string {
    const decipher = Crypto.createDecipheriv(
      encAlgo,
      this.secretKey,
      this.fixedIV,
    );
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    return (decryptedData += decipher.final('utf8'));
  }
  
  hashPassword(password: string): string {
    const hash = Crypto.createHash(hashAlgo);
    hash.update(password);
    return hash.digest('hex');
  }
}
