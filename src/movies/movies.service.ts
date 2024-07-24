import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { MovieDto } from './dto/movies.dto';
import { FilterationDto } from './dto/filteration.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addMovie(dto: MovieDto): Promise<{ movie: Movie }> {
    const movie = await this.prismaService.movie.create({ data: { ...dto } });

    return { movie };
  }

  async getMovies(dto: FilterationDto): Promise<{ total: number; movies: object }> {
    const [total, movies] = await Promise.all([
      this.prismaService.movie.count({
        where: {
          title: dto.title || undefined,
          genre: dto.genre || undefined,
          actors: dto.actors || undefined,
          duration: dto.duration || undefined,
          // Add more filters as needed
        },
      }),
      this.prismaService.movie.findMany({
        where: {
          title: dto.title || undefined,
          genre: dto.genre || undefined,
          actors: dto.actors || undefined,
          duration: dto.duration || undefined,
          // Add more filters as needed
        },
        skip: (dto.page - 1) * dto.size,
        take: dto.size,
        orderBy: { id: 'asc' },
      }),
    ]);

    return { total, movies };
  }

  async getMovie(id: number): Promise<{ movie: Movie }> {
    const movie = await this.prismaService.movie.findUnique({ where: { id } });
    return { movie };
  }

  async updateMovie(id: number, dto: MovieDto): Promise<{ movie: Movie }> {
    const currentMovie = await this.prismaService.movie.findUnique({ where: { id } });

    if (!currentMovie) {
      throw new NotFoundException('Movie not found.');
    }

    const movie = await this.prismaService.movie.update({ where: { id }, data: { ...currentMovie, ...dto } });

    return { movie };
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.prismaService.movie.findUnique({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Movie not exist');
    }

    await this.prismaService.movie.delete({ where: { id } });
  }
}
