import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TheatersService } from './theaters.service';
import { TheaterDto } from './dto/theaters.dto';
import { FilterationDto } from './dto/theater-filteration.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from 'prisma/generated/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('theaters')
@Roles(UserRoles.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class TheatersController {
  constructor(private readonly theaterService: TheatersService) {}

  @Post()
  addTheater(@Body() dto: TheaterDto) {
    return this.theaterService.addTheater(dto);
  }

  @Get(':id')
  getTheater(@Param('id') id: number) {
    return this.theaterService.getTheater(id);
  }

  @Get()
  getTheaters(@Query() dto: FilterationDto) {
    return this.theaterService.getTheaters(dto);
  }

  @Patch(':id')
  updateTheater(@Param('id') id: number, @Body() dto: TheaterDto) {
    return this.theaterService.updateTheater(id, dto);
  }

  @Delete(':id')
  deleteTheater(@Param('id') id: number) {
    return this.theaterService.deleteTheater(id);
  }
}
