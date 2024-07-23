import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangePassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  verificationCode: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
