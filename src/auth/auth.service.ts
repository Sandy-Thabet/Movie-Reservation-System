import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/notifications/mails/mails.service';
import { ForgetPassDto } from './dto/forget-password.dto';
import { VerificationCodeService } from 'src/notifications/verification-code.service';
import { ChangePassDto } from './dto/change-password.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService, // Note the change here
    private mailService: MailService,
    private verificationCodeService: VerificationCodeService,
  ) {}

  async signup(dto: SignUpDto): Promise<{ user: User; accessToken: string }> {
    const isUserExist = await this.prismaService.user.findUnique({ where: { email: dto.email } });

    if (isUserExist) {
      throw new BadRequestException('Email already exists.');
    }

    const hashedPass = await bcrypt.hash(dto.password, 12);

    const user = await this.prismaService.user.create({
      data: { email: dto.email, fullName: dto.fullName, password: hashedPass, phoneNumber: dto.phoneNumber },
    });

    const accessToken = this.jwtService.sign({ user: user.id });

    delete user.password;

    return { user, accessToken };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; user: User }> {
    const user = await this.prismaService.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new NotFoundException(`No User found for email: ${dto.email}`);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({ user: user.id });

    delete user.password;
    // delete user.verificationCode;

    return { user, accessToken };
  }

  async forgetPassword(dto: ForgetPassDto): Promise<{ code: string }> {
    const user = await this.prismaService.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new BadRequestException('Email is not exist.');
    }

    const code = this.verificationCodeService.generateVerificationCode();

    const updatedUser = await this.prismaService.user.update({ where: { email: user.email }, data: { verificationCode: code } });

    await this.mailService.sendForgetPasswordReset({
      verificationCode: code,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
    });

    return { code };
  }

  async confirmResetPassword(dto: ChangePassDto): Promise<{ updatedUser: User }> {
    const user = await this.prismaService.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new BadRequestException('Invalid data');
    }

    if (user.verificationCode !== dto.verificationCode) {
      throw new BadRequestException('Invalid data');
    }

    const hashedPass = await bcrypt.hash(dto.password, 12);

    const updatedUser = await this.prismaService.user.update({ where: { email: user.email }, data: { password: hashedPass } });

    return { updatedUser };
  }

  async updateMe(userId: number, dto: UpdateMeDto): Promise<{ user: User }> {
    const currentUser = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!currentUser) {
      throw new NotFoundException('User is not found.');
    }

    const user = await this.prismaService.user.update({ where: { id: userId }, data: { ...currentUser, ...dto } });

    delete user.password;

    return { user };
  }

  async getMe(userId: number): Promise<{ user: User }> {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    delete user.password;
    delete user.verificationCode;

    return { user };
  }
}
