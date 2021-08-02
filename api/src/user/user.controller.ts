import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestDecodedUser } from './user.decorator';
import { GetUserDto, RegisterUserDto } from './user.dto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@RequestDecodedUser() user: GetUserDto) {
    console.log(user);
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
