import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { SchedulesDto } from './dto/schedules.dto';
import { Schedule } from 'prisma/generated/client';

@Injectable()
export class SchedulesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addSchedule(dto: SchedulesDto): Promise<{ schedule: Schedule }> {
    if (dto.showTime >= dto.endTime) {
      throw new BadRequestException('End Time must be after Show Time.');
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
}
