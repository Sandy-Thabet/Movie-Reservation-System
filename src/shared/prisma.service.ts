import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['error', 'info', 'query', 'warn'],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
