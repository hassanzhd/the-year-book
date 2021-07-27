import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(
    __email: string,
    __password: string,
    __handle: string,
    __fullName: string,
    __university: string,
    __shortBio: string,
    __batch: number,
    __verificationHash: string,
    __imageLink: string = '/user.png',
  ): Promise<User> {
    try {
      const newUser: User = this.usersRepository.create({
        email: __email,
        password: __password,
        handle: __handle,
        fullName: __fullName,
        university: __university,
        shortBio: __shortBio,
        batch: __batch,
        imageLink: __imageLink,
        verificationHash: __verificationHash,
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new BadGatewayException(['Something went wrong. Try again later']);
    }
  }
}
