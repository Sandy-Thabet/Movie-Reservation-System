import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMeDto } from './dto/update-me.dto';
import { PrismaService } from 'src/shared/prisma.service';
import { User } from 'prisma/generated/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async updateMe(userId: number, dto: UpdateMeDto): Promise<{ user: User }> {
    const currentUser = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!currentUser) {
      throw new NotFoundException('User is not found.');
    }

    const user = await this.prismaService.user.update({ where: { id: userId }, data: { ...currentUser, ...dto } });

    delete user.password;

    return { user };
  }

  async getMe(userId: number): Promise<{ user: User }> {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    delete user.password;
    delete user.verificationCode;

    return { user };
  }
}
