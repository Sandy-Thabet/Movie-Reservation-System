import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class SchedulesDto {
  @IsNotEmpty()
  @IsNumber()
  movieId: number;

  @IsNotEmpty()
  @IsNumber()
  theaterId: number;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @Matches(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/gm)
  showTime: string;

  @IsNotEmpty()
  @Matches(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/gm)
  endTime: string;
}
