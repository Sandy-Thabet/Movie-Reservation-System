import { IsEmail, IsString } from 'class-validator';

export class VerificationCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  verificationCode: string;
}
