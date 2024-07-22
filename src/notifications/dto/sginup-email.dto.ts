import { IsEmail, IsString } from 'class-validator';

export class SignUpEmailDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;
}
