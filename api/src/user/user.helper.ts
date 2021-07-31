import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserHelper {
  uploadImage(__file: Express.Multer.File) {
    console.log(__file);
  }

  generateVerificationHash(): string {
    const verificationHash = randomBytes(30).toString('hex');
    return verificationHash;
  }

  async generateHashedPassword(__password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(__password, salt);
    return hashedPassword;
  }

  async verifyPassword(__password: string, __hashedPassword: string) {
    const passwordVerified = await bcrypt.compare(__password, __hashedPassword);
    return passwordVerified;
  }

  getErrorMessage(__errorType: string) {
    switch (__errorType) {
      case 'EntityNotFoundError':
        return 'Could not find any account associated with this email';
      default:
        break;
    }
  }
}
