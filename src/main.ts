import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ always: true, transform: true }));

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get('LOCAL_URL'), configService.get('PROD_URL')],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(configService.get('PORT') || 3080);
}
bootstrap();
