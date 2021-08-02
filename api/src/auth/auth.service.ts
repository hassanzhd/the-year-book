import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user/user.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async verifyPassword(__password: string, __hashedPassword: string) {
    const passwordVerified = await bcrypt.compare(__password, __hashedPassword);
    return passwordVerified;
  }

  async login(__requestBody: LoginDto) {
    const user = await this.userService.findOne(__requestBody.email);
    const passwordVerified = await this.verifyPassword(
      __requestBody.password,
      user.password,
    );

    if (!passwordVerified) {
      throw new UnauthorizedException(['Password is incorrect']);
    }
  }
}
