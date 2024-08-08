import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({ imports: [AuthModule, SharedModule], controllers: [SchedulesController], providers: [SchedulesService, RolesGuard] })
export class SchedulesModule {}
