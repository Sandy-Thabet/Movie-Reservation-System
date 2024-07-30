import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SeatType } from 'prisma/generated/client';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class SeatsFilterationDto extends PaginationDto {
  @IsNumber()
  @IsOptional()
  theaterId: number;

  @IsNumber()
  @IsOptional()
  row: number;

  @IsNumber()
  @IsOptional()
  number: number;

  @IsOptional()
  @IsBoolean()
  reserved: boolean;

  @IsOptional()
  @IsEnum(SeatType)
  type: SeatType;
}
