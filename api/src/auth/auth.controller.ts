import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() response: Response, @Body() body: LoginDto) {
    await this.authService.login(body);
    response
      .status(HttpStatus.OK)
      .json({ message: 'User successfully logged in' });
  }
}
