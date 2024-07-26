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

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, SharedModule, NotificationsModule, MoviesModule],
  controllers: [AppController],
  providers: [MailService, JwtService],
})
export class AppModule {}
