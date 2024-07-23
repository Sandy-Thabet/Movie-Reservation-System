import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
