import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchedulesDto } from './dto/schedules.dto';
import { SchedulesService } from './schedules.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @Post()
  addSchedule(@Body() dto: SchedulesDto) {
    return this.scheduleService.addSchedule(dto);
  }
}
