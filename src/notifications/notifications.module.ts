import { Module } from '@nestjs/common';
import { MailService } from './mails/mails.service';
import { MailModule } from './mails/mails.module';
import { VerificationCodeService } from './verification-code.service';

@Module({
  imports: [MailModule],
  providers: [MailService, VerificationCodeService],
  exports: [MailModule, VerificationCodeService],
})
export class NotificationsModule {}
