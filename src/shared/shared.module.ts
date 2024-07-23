import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, JwtService],
  exports: [PrismaService],
})
export class SharedModule {}
