import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
