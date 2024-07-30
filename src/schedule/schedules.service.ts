import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { SchedulesDto } from './dto/schedules.dto';
import { Schedule } from 'prisma/generated/client';
import { SchedulesFilterationDto } from './dto/schedules-filteration.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addSchedule(dto: SchedulesDto): Promise<{ schedule: Schedule }> {
    if (dto.showTime >= dto.endTime) {
      throw new BadRequestException('End Time must be after Show Time.');
    }

    const theater = await this.prismaService.theater.findUnique({ where: { id: dto.theaterId } });
    if (!theater) {
      throw new NotFoundException('No Theater by this id');
    }

    const movie = await this.prismaService.movie.findUnique({ where: { id: dto.movieId } });
    if (!movie) {
      throw new NotFoundException('No Movie by this id');
    }

    const IsExist = await this.prismaService.schedule.findFirst({
      where: { theaterId: dto.theaterId, movieId: dto.movieId, showTime: dto.showTime, endTime: dto.endTime, date: dto.date },
    });

    if (IsExist) {
      throw new BadRequestException('Schedule is already exist.');
    }

    let cost = 0;
    if (dto.showTime >= '18:00:00') {
      cost += 100;
    }

    const schedule = await this.prismaService.schedule.create({
      data: {
        theaterId: dto.theaterId,
        movieId: dto.movieId,
        date: dto.date,
        showTime: dto.showTime,
        endTime: dto.endTime,
        additionalCost: cost,
      },
    });

    return { schedule };
  }

  async getSchedule(id: number): Promise<{ schedule: Schedule }> {
    const schedule = await this.prismaService.schedule.findUnique({
      where: { id },
      include: { movie: true, theater: true, reservations: true },
    });

    if (!schedule) {
      throw new NotFoundException('Shcedule not found.');
    }

    return { schedule };
  }

  async getAllSchedules(dto: SchedulesFilterationDto): Promise<{ total: number; results: number; schedules: object }> {
    const [total, schedules] = await Promise.all([
      await this.prismaService.schedule.count({ where: { date: dto.date, endTime: dto.endTime, movieId: dto.movieId, showTime: dto.showTime } }),
      await this.prismaService.schedule.findMany({
        where: { date: dto.date, endTime: dto.endTime, movieId: dto.movieId, showTime: dto.showTime },
        skip: (dto.page - 1) * dto.size,
        take: dto.size,
        orderBy: { id: 'asc' },
      }),
    ]);

    return { total, results: schedules.length, schedules };
  }

  async updateSchedule(id: number, dto: SchedulesDto): Promise<{ schedule: Schedule }> {
    const currentSchedule = await this.prismaService.schedule.findUnique({ where: { id } });

    if (!currentSchedule) {
      throw new NotFoundException('Schedule not found.');
    }
    if (dto.showTime >= dto.endTime) {
      throw new BadRequestException('End Time must be after Show Time.');
    }

    const theater = await this.prismaService.theater.findUnique({ where: { id: dto.theaterId } });
    if (!theater) {
      throw new NotFoundException('No Theater by this id');
    }

    const movie = await this.prismaService.movie.findUnique({ where: { id: dto.movieId } });
    if (!movie) {
      throw new NotFoundException('No Movie by this id');
    }

    const IsExist = await this.prismaService.schedule.findFirst({
      where: { theaterId: dto.theaterId, movieId: dto.movieId, showTime: dto.showTime, endTime: dto.endTime, date: dto.date },
    });

    if (IsExist) {
      throw new BadRequestException('This data is already exist in different Schedule.');
    }

    if (dto.showTime >= '18:00:00') {
      currentSchedule.additionalCost = 100;
    } else {
      currentSchedule.additionalCost = 0;
    }

    const schedule = await this.prismaService.schedule.update({
      where: { id },
      data: { ...currentSchedule, ...dto },
    });

    return { schedule };
  }

  async deleteSchedule(id: number): Promise<void> {
    const schedule = await this.prismaService.schedule.findUnique({ where: { id } });

    if (!schedule) {
      throw new NotFoundException('Schedule not found.');
    }

    await this.prismaService.schedule.delete({ where: { id } });
  }
}
