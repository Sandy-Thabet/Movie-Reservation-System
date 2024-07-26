import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({ imports: [AuthModule, SharedModule], controllers: [SeatsController], providers: [SeatsService] })
export class SeatsModule {}
