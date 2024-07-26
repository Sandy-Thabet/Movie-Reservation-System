import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { UpdateMeDto } from './dto/update-me.dto';
import { User } from 'prisma/generated/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('')
  updateMe(@GetUser() user: User, @Body() dto: UpdateMeDto) {
    return this.userService.updateMe(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return this.userService.getMe(user.id);
  }
}
