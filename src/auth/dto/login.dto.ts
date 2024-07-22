import {
  IsEmail,
  IsNotEmpty,
  //   IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   fullName: string;

  //   @IsNotEmpty()
  //   @IsNumber()
  //   phoneNumber: number;
}
