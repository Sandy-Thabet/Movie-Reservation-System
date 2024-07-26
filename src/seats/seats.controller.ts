import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SeatsService } from './seats.service';
import { SeatsDto } from './dto/seats.dto';

@Controller('seats')
@UseGuards(JwtAuthGuard)
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  addSeat(@Body() dto: SeatsDto) {
    return this.seatsService.addSeat(dto);
  }

  @Get(':id')
  getSeat(@Param('id') id: number) {
    return this.seatsService.getSeat(id);
  }
}
