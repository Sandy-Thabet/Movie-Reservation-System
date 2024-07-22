import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/notifications/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtSecret: JwtService,
    private mailService: MailService,
  ) {}

  async signup(dto: SignUpDto): Promise<{ user: object; accessToken: string }> {
    const isUserExist = await this.prismaService.user.findUnique({ where: { email: dto.email } });

    if (isUserExist) {
      throw new BadRequestException('Email is already exist.');
    }

    const hashedPass = await bcrypt.hash(dto.password, 12);

    const user = await this.prismaService.user.create({
      data: { email: dto.email, fullName: dto.fullName, password: hashedPass, phoneNumber: dto.phoneNumber },
    });

    await this.mailService.sendMail({ to: user.email, subject: 'hello', text: 'test' });

    const accessToken = this.jwtSecret.sign({ user: user.id });

    delete user.password;

    return { user, accessToken };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new NotFoundException(`No User found for emial: ${dto.email}`);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return { accessToken: this.jwtSecret.sign({ user: user.id }) };
  }
}
