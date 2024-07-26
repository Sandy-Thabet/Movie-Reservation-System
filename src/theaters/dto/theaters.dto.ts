import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TheaterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  seatingCapacity: number;
}
