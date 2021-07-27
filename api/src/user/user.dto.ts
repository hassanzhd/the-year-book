import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

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
