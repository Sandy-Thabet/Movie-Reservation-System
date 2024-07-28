import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReservationsDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;
}
