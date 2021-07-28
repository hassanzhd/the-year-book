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
}
