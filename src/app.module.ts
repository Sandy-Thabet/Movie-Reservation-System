import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MailService } from './notifications/mails/mails.service';
import { JwtService } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TheatersModule } from './theaters/theaters.module';
import { SeatsModule } from './seats/seats.module';
import { SchedulesModule } from './schedule/schedules.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    SharedModule,
    NotificationsModule,
    MoviesModule,
    TheatersModule,
    SeatsModule,
    SchedulesModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [MailService, JwtService],
})
export class AppModule {}
