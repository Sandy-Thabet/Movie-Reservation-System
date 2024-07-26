import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Theater } from 'prisma/generated/client';
import { PrismaService } from 'src/shared/prisma.service';
import { TheaterDto } from './dto/theaters.dto';

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

  async getTheaters() {}
}
