import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(__email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({ email: __email });
      return user;
    } catch (error) {
      throw new BadGatewayException([error.message]);
    }
  }

  async uploadImage(__image: Express.Multer.File) {
    return '/user.png';
  }

  generateVerificationHash(__length: number): string {
    const verificationHash = randomBytes(__length).toString('hex');
    return verificationHash;
  }

  async generateHashedPassword(__password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(__password, salt);
    return hashedPassword;
  }

  async createUser(
    __email: string,
    __password: string,
    __handle: string,
    __fullName: string,
    __university: string,
    __shortBio: string,
    __batch: number,
    __image: Express.Multer.File,
  ): Promise<User> {
    try {
      const imageLink = await this.uploadImage(__image);
      const verificationHash = this.generateVerificationHash(30);
      const hashedPassword = await this.generateHashedPassword(__password);

      const newUser: User = this.usersRepository.create({
        email: __email,
        password: hashedPassword,
        handle: __handle,
        fullName: __fullName,
        university: __university,
        shortBio: __shortBio,
        batch: __batch,
        imageLink: imageLink,
        verificationHash: verificationHash,
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new BadGatewayException(['Something went wrong. Try again later']);
    }
  }
}
