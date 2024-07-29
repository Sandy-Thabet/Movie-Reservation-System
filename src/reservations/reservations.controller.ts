import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReservationsService } from './reservations.service';
// import { ReservationsDto } from './dto/reservation.dto';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  //   @Post()
  //   addReservation(@Body() dto: ReservationsDto) {
  //     return this.reservationsService.addReservation(dto);
  //   }
}
