import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUserDto, RegisterUserDto, LoginUserDto } from './user.dto';
import { UserHelper } from './user.helper';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly userHelper: UserHelper,
  ) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    const transformmedDtoUsers = GetUserDto.fromUserEntities(users);
    return transformmedDtoUsers;
  }

  @Post('login')
  async login(@Res() response: Response, @Body() body: LoginUserDto) {
    const user = await this.userService.findOne(body.email);
    const passwordVerified = await this.userHelper.verifyPassword(
      body.password,
      user.password,
    );

    if (!passwordVerified) {
      throw new UnauthorizedException(['Password is incorrect']);
    }

    response
      .status(HttpStatus.OK)
      .json({ message: 'User successfully logged in' });
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: RegisterUserDto,
  ) {
    this.userHelper.uploadImage(file);
    const verificationHash = this.userHelper.generateVerificationHash();
    const hashedPassword = await this.userHelper.generateHashedPassword(
      body.password,
    );
    await this.userService.createUser(
      body.email,
      hashedPassword,
      body.handle,
      body.fullName,
      body.university,
      body.shortBio,
      parseInt(body.batch),
      verificationHash,
    );
    return { message: 'User succesfully registered.' };
  }
}
