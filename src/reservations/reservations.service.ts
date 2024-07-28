import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { ReservationsDto } from './dto/reservation.dto';
import { Reservation } from 'prisma/generated/client';

@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addReservation(dto: ReservationsDto): Promise<{ reservation: Reservation }> {
    const reservation = await this.prismaService.reservation.create({ data: { userId: dto.userId, scheduleId: dto.scheduleId } });

    return { reservation };
  }
}
