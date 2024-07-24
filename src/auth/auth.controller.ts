import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgetPassDto } from './dto/forget-password.dto';
import { ChangePassDto } from './dto/change-password.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forget-password')
  forgetPassword(@Body() dto: ForgetPassDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('password-reset/confirm')
  confirmResetPassword(@Body() dto: ChangePassDto) {
    return this.authService.confirmResetPassword(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  updateMe(@GetUser() user: User, @Body() dto: UpdateMeDto) {
    return this.authService.updateMe(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return this.authService.getMe(user.id);
  }
}
