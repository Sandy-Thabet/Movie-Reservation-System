import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { SchedulesDto } from './dto/schedules.dto';
import { Schedule } from 'prisma/generated/client';

@Injectable()
export class SchedulesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addSchedule(dto: SchedulesDto): Promise<{ schedule: Schedule }> {
    const IsExist = await this.prismaService.schedule.findFirst({
      where: { theaterId: dto.theaterId, movieId: dto.movieId, showTime: dto.showTime, endTime: dto.endTime },
    });

    if (IsExist) {
      throw new BadRequestException('Schedule is already exist.');
    }

    const schedule = await this.prismaService.schedule.create({
      data: { theaterId: dto.theaterId, movieId: dto.movieId, showTime: dto.showTime, endTime: dto.endTime },
    });

    return { schedule };
  }
}
