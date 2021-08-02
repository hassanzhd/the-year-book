import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user/user.service';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from 'src/user/user.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyPassword(__password: string, __hashedPassword: string) {
    const passwordVerified = await bcrypt.compare(__password, __hashedPassword);
    return passwordVerified;
  }

  async validateRequest(request: Request) {
    const { accessToken } = request.cookies;
    try {
      const decodedUser = await this.jwtService.verify(accessToken);
      return decodedUser;
    } catch (err) {
      return false;
    }
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

    const transformmedUser = GetUserDto.fromUserEntity(user);
    return this.jwtService.sign({ ...transformmedUser });
  }
}
