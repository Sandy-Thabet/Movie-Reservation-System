import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SeatsDto {
  @IsNumber()
  @IsNotEmpty()
  theaterId: number;

  @IsNumber()
  @IsNotEmpty()
  row: number;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsOptional()
  @IsBoolean()
  reserved: boolean;
}
