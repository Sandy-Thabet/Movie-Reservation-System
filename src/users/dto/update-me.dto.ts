import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateMeDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsOptional()
  @IsPhoneNumber('EG')
  phoneNumber: string;
}
