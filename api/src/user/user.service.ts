import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserHelper } from './user.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly userHelper: UserHelper,
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
      const errorMessage = this.userHelper.getErrorMessage(
        error.constructor.name,
      );
      throw new BadGatewayException([errorMessage]);
    }
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
