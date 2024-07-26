import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TheatersService } from './theaters.service';
import { TheaterDto } from './dto/theaters.dto';

@Controller('theaters')
@UseGuards(JwtAuthGuard)
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
  getTheaters() {
    //filteration dto
    return this.theaterService.getTheaters();
  }
}
