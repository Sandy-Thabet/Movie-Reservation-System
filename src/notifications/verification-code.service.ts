import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class VerificationCodeService {
  generateVerificationCode(length: number = 6): string {
    const buffer = randomBytes(length);
    const code = buffer.toString('hex').slice(0, length).toUpperCase();
    return code;
  }
}
