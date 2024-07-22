import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
// import { join } from 'path';
// import { HandlebarsAdapter } from 'handlebars';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: configService.get<string>('EMAIL'),
            // pass: configService.get<string>('WORD'),
            clientId: configService.get<string>('OAUTH_CLIENTID'),
            clientSecret: configService.get<string>('OAUTH_CLIENT_SECRET'),
            refreshToken: configService.get<string>('OAUTH_REFRESH_TOKEN'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('EMAIL')}>`,
        },
        // template: {
        //   dir: join(__dirname, 'templates'),
        //   //   adapter: new HandlebarsAdapter(), // or any other template engine adapter
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class NotificationsModule {}
