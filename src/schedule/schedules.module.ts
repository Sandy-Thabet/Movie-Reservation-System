import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({ imports: [AuthModule, SharedModule], controllers: [SchedulesController], providers: [SchedulesService] })
export class SchedulesModule {}
