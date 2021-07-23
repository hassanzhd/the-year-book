import {
  Body,
  Controller,
  Header,
  Ip,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  register(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log(file);
    console.table(body);
    return;
  }
}
