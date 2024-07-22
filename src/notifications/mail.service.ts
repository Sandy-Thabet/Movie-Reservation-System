import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SignUpEmailDto } from './dto/sginup-email.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(dto: SignUpEmailDto) {
    await this.mailerService.sendMail({
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      //   html,
    });
  }
}
