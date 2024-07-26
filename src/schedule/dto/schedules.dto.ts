import { IsNotEmpty, IsNumber } from 'class-validator';

export class SchedulesDto {
  @IsNotEmpty()
  @IsNumber()
  movieId: number;

  @IsNotEmpty()
  @IsNumber()
  theaterId: number;

  @IsNotEmpty()
  // @IsNumber()
  showTime: Date;

  @IsNotEmpty()
  // @IsNumber()
  endTime: Date;
}
