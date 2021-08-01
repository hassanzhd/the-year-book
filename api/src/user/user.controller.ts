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
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

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
    await this.userService.createUser(
      body.email,
      body.password,
      body.handle,
      body.fullName,
      body.university,
      body.shortBio,
      parseInt(body.batch),
      file,
    );
    return { message: 'User succesfully registered.' };
  }
}
