import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SeatsService } from './seats.service';
import { SeatsDto } from './dto/seats.dto';
import { SeatsFilterationDto } from './dto/seats-filteration.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from 'prisma/generated/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('seats')
@Roles(UserRoles.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  addSeat(@Body() dto: SeatsDto) {
    return this.seatsService.addSeat(dto);
  }

  @Get('available')
  getAvailableSeats(@Query() dto: PaginationDto) {
    return this.seatsService.getAvailableSeats(dto);
  }

  @Get(':id')
  getSeat(@Param('id') id: number) {
    return this.seatsService.getSeat(id);
  }

  @Get()
  getAllSeats(@Query() dto: SeatsFilterationDto) {
    return this.seatsService.getAllSeats(dto);
  }

  @Patch(':id')
  updateSeat(@Param('id') id: number, @Body() dto: SeatsDto) {
    return this.seatsService.updateSeat(id, dto);
  }

  @Delete(':id')
  deleteSeat(@Param('id') id: number) {
    return this.seatsService.deleteSeat(id);
  }
}
