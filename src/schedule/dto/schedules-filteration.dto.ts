import { Type } from 'class-transformer';
import { IsInt, IsOptional, Matches, Min } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class SchedulesFilterationDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  movieId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  theaterId: number;

  @IsOptional()
  date: Date;

  @IsOptional()
  @Matches(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/gm)
  showTime: string;

  @IsOptional()
  @Matches(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/gm)
  endTime: string;
}
