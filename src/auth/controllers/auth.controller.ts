import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpCode, HttpStatus, Body,
} from '@nestjs/common'
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RegistrationDto } from '../../dtos/registration.dto'
import { User } from '../../models/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  async registration(
    @Body() registrationDto: RegistrationDto
  ): Promise<User> {
    return this.authService.registration(registrationDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
