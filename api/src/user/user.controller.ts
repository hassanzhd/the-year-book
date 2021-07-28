import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUserDto, RegisterUserDto } from './user.dto';
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
