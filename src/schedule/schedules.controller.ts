import { Body, Controller, Post, UseGuards, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import { SchedulesDto } from './dto/schedules.dto';
import { SchedulesService } from './schedules.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SchedulesFilterationDto } from './dto/schedules-filteration.dto';

@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @Post()
  addSchedule(@Body() dto: SchedulesDto) {
    return this.scheduleService.addSchedule(dto);
  }

  @Get()
  getAllSchedules(@Query() dto: SchedulesFilterationDto) {
    return this.scheduleService.getAllSchedules(dto);
  }

  @Get(':id')
  getSchedule(@Param('id') id: number) {
    return this.scheduleService.getSchedule(id);
  }

  @Patch(':id')
  updateSchedule(@Param('id') id: number, @Body() dto: SchedulesDto) {
    return this.scheduleService.updateSchedule(id, dto);
  }

  @Delete(':id')
  deleteSchedule(@Param('id') id: number) {
    return this.scheduleService.deleteSchedule(id);
  }
}
