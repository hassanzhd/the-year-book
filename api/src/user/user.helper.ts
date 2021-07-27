import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class UserHelper {
  uploadImage(__file: Express.Multer.File) {
    console.log(__file);
  }

  generateVerificationHash(): string {
    const verificationHash = randomBytes(30).toString('hex');
    return verificationHash;
  }
}
