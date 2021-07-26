import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from './user.dto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  register(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: RegisterUserDto,
  ) {
    console.log(file);
    console.table(body);
    return { message: 'User succesfully registered.' };
  }
}
