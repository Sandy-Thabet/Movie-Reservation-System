import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  actors?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @Type(() => Number) // Convert to number
  @IsInt()
  @Min(1)
  page: number;

  @Type(() => Number) // Convert to number
  @IsInt()
  @Min(1)
  size: number;
}
