import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @MinLength(15)
  readonly email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password should be atleast 8 characters long.',
  })
  readonly password: string;

  @IsString()
  @MinLength(8, {
    message: 'Handle should be atleast 8 chracters long.',
  })
  readonly handle: string;

  @IsString()
  @MinLength(3, {
    message: 'Full name should be atleast 3 chracters long.',
  })
  readonly fullName: string;

  @IsString()
  readonly university: string;

  @IsString()
  @Length(4, 4, {
    message: 'Batch should be in the format 20xx',
  })
  readonly batch: string;

  @IsString()
  @MaxLength(160)
  readonly shortBio: string;
}
