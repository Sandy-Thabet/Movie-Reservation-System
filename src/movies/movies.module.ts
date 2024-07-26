import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
