import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from './user.dto';

@Controller('user')
export class UserController {
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
