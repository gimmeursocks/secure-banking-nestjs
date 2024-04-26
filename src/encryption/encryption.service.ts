import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { config } from 'dotenv';

config();

const secret = process.env.SECRET_KEY;

@Injectable()
export class EncryptionService {
  private readonly secretKey: string = secret;

  encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  hashPassword(password: string): string {
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hash;
  }
}
