import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SeatType } from 'prisma/generated/client';

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

  @IsString()
  @IsEnum(SeatType)
  type: SeatType;
}
