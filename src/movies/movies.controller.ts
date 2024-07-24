import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movies.dto';
import { FilterationDto } from './dto/filteration.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('')
  addMovie(@Body() dto: MovieDto) {
    return this.moviesService.addMovie(dto);
  }

  @Get('')
  getMovies(@Query() dto: FilterationDto) {
    return this.moviesService.getMovies(dto);
  }

  @Get(':id')
  getMovie(@Param('id') id: number) {
    return this.moviesService.getMovie(id);
  }

  @Patch(':id')
  updateMovie(@Param('id') id: number, @Body() dto: MovieDto) {
    return this.moviesService.updateMovie(id, dto);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    this.moviesService.deleteMovie(id);
    return { message: 'Movie deleted successfully' };
  }
}
