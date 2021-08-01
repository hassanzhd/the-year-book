import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserHelper {
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
