import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { SeatsDto } from './dto/seats.dto';
import { Seat } from 'prisma/generated/client';

@Injectable()
export class SeatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addSeat(dto: SeatsDto): Promise<{ seat: Seat }> {
    const isTheaterExist = await this.prismaService.theater.findUnique({
      where: { id: dto.theaterId },
    });

    if (!isTheaterExist) {
      throw new BadRequestException('Theater does not exist.');
    }

    const isExist = await this.prismaService.seat.findFirst({
      where: { theaterId: dto.theaterId, row: dto.row, number: dto.number },
    });

    if (isExist) {
      throw new BadRequestException('Seat already exists.');
    }

    const seat = await this.prismaService.seat.create({ data: { ...dto } });

    return { seat };
  }

  async getSeat(id: number): Promise<{ seat: Seat }> {
    const seat = await this.prismaService.seat.findUnique({ where: { id } });

    if (!seat) {
      throw new NotFoundException('Seat not found.');
    }

    return { seat };
  }
}
