import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationCodeDto } from './dto/verification-code.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendForgetPasswordReset(dto: VerificationCodeDto) {
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Reset Password Code',
      template: `${__dirname}/../../../templates/reset-password-code.hbs`,
      context: {
        fullName: dto.fullName,
        verificationCode: dto.verificationCode,
      },
    });
  }

  async sendResendVerification(dto: VerificationCodeDto) {
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Resend Verification Code',
      template: `${__dirname}/../../../templates/resend-verification-code.hbs`,
      context: {
        fullName: dto.fullName,
        verificationCode: dto.verificationCode,
      },
    });
  }
}
