import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Theater } from 'prisma/generated/client';
import { PrismaService } from 'src/shared/prisma.service';
import { TheaterDto } from './dto/theaters.dto';
import { FilterationDto } from './dto/theater-filteration.dto';

@Injectable()
export class TheatersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addTheater(dto: TheaterDto): Promise<{ theater: Theater }> {
    const isExist = await this.prismaService.theater.findFirst({ where: { name: dto.name, location: dto.location } });

    if (isExist) {
      throw new BadRequestException('Theater is already exist.');
    }

    const theater = await this.prismaService.theater.create({ data: { ...dto } });

    return { theater };
  }

  async getTheater(id: number): Promise<{ theater: Theater }> {
    const theater = await this.prismaService.theater.findUnique({ where: { id } });

    if (!theater) {
      throw new NotFoundException('Theater not found');
    }

    return { theater };
  }

  async getTheaters(dto: FilterationDto): Promise<{ total: number; theaters: object; results: number }> {
    const [total, theaters] = await Promise.all([
      this.prismaService.theater.count({ where: { name: dto.name, location: dto.location, seatingCapacity: dto.seatingCapacity } }),
      this.prismaService.theater.findMany({
        where: { name: dto.name, location: dto.location, seatingCapacity: dto.seatingCapacity },
        skip: (dto.page - 1) * dto.size,
        take: dto.size,
        orderBy: { id: 'asc' },
      }),
    ]);

    return { total, results: theaters.length, theaters };
  }

  async updateTheater(id: number, dto: TheaterDto): Promise<{ theater: Theater }> {
    const currentTheater = await this.prismaService.theater.findUnique({ where: { id } });

    if (!currentTheater) {
      throw new NotFoundException('Theater not found.');
    }

    const theater = await this.prismaService.theater.update({ where: { id }, data: { ...currentTheater, ...dto } });

    return { theater };
  }

  async deleteTheater(id: number): Promise<void> {
    const isExist = await this.prismaService.theater.findUnique({ where: { id } });

    if (!isExist) {
      throw new NotFoundException('Theater not found.');
    }

    await this.prismaService.theater.delete({ where: { id } });
  }
}
