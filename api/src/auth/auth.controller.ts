import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async authorize(@Req() request: Request) {
    const { accessToken } = request.cookies;
    const decodedUser = await this.authService.validateAccessToken(accessToken);
    return { user: decodedUser };
  }

  @Post('login')
  async login(@Res() response: Response, @Body() body: LoginDto) {
    const accessToken = await this.authService.login(body);
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    response
      .status(HttpStatus.OK)
      .json({ message: 'User successfully logged in' });
  }

  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('accessToken');
    response
      .status(HttpStatus.OK)
      .json({ message: 'User successfully logged out' });
  }
}
