import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { SeatsDto } from './dto/seats.dto';
import { Seat } from 'prisma/generated/client';
import { SeatsFilterationDto } from './dto/seats-filteration.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

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

    let cost = 0;
    if (dto.type === 'VIP') {
      cost = 100;
    }

    const seat = await this.prismaService.seat.create({
      data: { number: dto.number, row: dto.row, theaterId: dto.theaterId, type: dto.type, additionalCost: cost },
    });

    return { seat };
  }

  async getSeat(id: number): Promise<{ seat: Seat }> {
    const seat = await this.prismaService.seat.findUnique({ where: { id }, include: { theater: true } });

    if (!seat) {
      throw new NotFoundException('Seat not found.');
    }

    return { seat };
  }

  async getAllSeats(dto: SeatsFilterationDto): Promise<{ total: number; seats: object; results: number }> {
    const [total, seats] = await Promise.all([
      await this.prismaService.seat.count({
        where: { number: dto.number, theaterId: dto.theaterId, type: dto.type, row: dto.row, reserved: dto.reserved },
      }),
      await this.prismaService.seat.findMany({
        where: { number: dto.number, theaterId: dto.theaterId, type: dto.type, row: dto.row, reserved: dto.reserved },
        skip: (dto.page - 1) * dto.size,
        take: dto.size,
        orderBy: { id: 'asc' },
      }),
    ]);

    return { total, results: seats.length, seats };
  }

  async updateSeat(id: number, dto: SeatsDto): Promise<{ seat: Seat }> {
    const currentSeat = await this.prismaService.seat.findUnique({ where: { id } });

    if (!currentSeat) {
      throw new NotFoundException('Seat not found.');
    }

    const isTheaterExist = await this.prismaService.theater.findUnique({
      where: { id: dto.theaterId },
    });

    if (!isTheaterExist) {
      throw new BadRequestException('Theater does not exist.');
    }

    if (dto.type !== 'VIP') {
      currentSeat.additionalCost = 0;
    } else if (dto.type === 'VIP') {
      currentSeat.additionalCost = 100;
    }

    const seat = await this.prismaService.seat.update({ where: { id }, data: { ...currentSeat, ...dto } });

    return { seat };
  }

  async deleteSeat(id: number): Promise<void> {
    const seat = await this.prismaService.seat.findUnique({ where: { id } });

    if (!seat) {
      throw new NotFoundException('Seat not found.');
    }

    await this.prismaService.seat.delete({ where: { id } });
  }

  async getAvailableSeats(dto: PaginationDto): Promise<{ seats: object; total: number; results: number }> {
    const [total, seats] = await Promise.all([
      await this.prismaService.seat.count({ where: { reserved: false } }),
      await this.prismaService.seat.findMany({ where: { reserved: false }, skip: (dto.page - 1) * dto.size, take: dto.size, orderBy: { id: 'asc' } }),
    ]);

    return { total, results: seats.length, seats };
  }
}
