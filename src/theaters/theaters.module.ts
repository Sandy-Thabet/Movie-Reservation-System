import { Module } from '@nestjs/common';
import { TheatersController } from './theaters.controller';
import { TheatersService } from './theaters.service';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({ imports: [SharedModule, AuthModule], controllers: [TheatersController], providers: [TheatersService] })
export class TheatersModule {}
