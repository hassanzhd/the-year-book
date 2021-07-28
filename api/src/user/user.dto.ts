import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from './user.entity';

export class GetUserDto {
  readonly email: string;
  readonly handle: string;
  readonly fullName: string;
  readonly university: string;
  readonly shortBio: string;
  readonly batch: number;
  readonly imageLink: string;

  constructor(__user: User) {
    this.email = __user.email;
    this.handle = __user.handle;
    this.fullName = __user.fullName;
    this.university = __user.university;
    this.shortBio = __user.shortBio;
    this.batch = __user.batch;
    this.imageLink = __user.imageLink;
  }

  static fromUserEntities(__users: User[]): GetUserDto[] {
    const transformmedUsers = __users.map((__user: User) => {
      const transformmedUser = new GetUserDto(__user);
      return transformmedUser;
    });

    return transformmedUsers;
  }
}

export class RegisterUserDto {
  @IsEmail()
  @MinLength(15, {
    message: 'Email must be greater than or equal to 15 characters',
  })
  @MaxLength(255, {
    message: 'Email must be shorter than or equal to 255 characters',
  })
  readonly email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password must be greater than or equal to 8 characters',
  })
  @MaxLength(128, {
    message: 'Password must be shorter than or equal to 128 characters',
  })
  readonly password: string;

  @IsString()
  @MinLength(8, {
    message: 'Handle must be greater than or equal to 8 characters',
  })
  @MaxLength(255, {
    message: 'Handle must be shorter than or equal to 255 characters',
  })
  readonly handle: string;

  @IsString()
  @MinLength(3, {
    message: 'Full name must be greater than or equal to 3 characters',
  })
  @MaxLength(255, {
    message: 'Full name must be shorter than or equal to 255 characters',
  })
  readonly fullName: string;

  @IsString()
  @MaxLength(255, {
    message: 'University must be shorter than or equal to 255 characters',
  })
  readonly university: string;

  @IsString()
  @Length(4, 4, {
    message: 'Batch must be in the format 20xx',
  })
  readonly batch: string;

  @IsString()
  @MaxLength(160, {
    message: 'Short bio must be shorter than or equal to 160 characters',
  })
  readonly shortBio: string;
}
