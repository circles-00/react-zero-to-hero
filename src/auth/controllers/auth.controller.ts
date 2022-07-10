import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpCode, HttpStatus, Body, BadRequestException,
} from '@nestjs/common'
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RegistrationDto } from '../../dtos/registration.dto'
import { User } from '../../models/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '../../decorators/public.decorator'
import { ThirdPartyLoginDto } from '../dtos/third-party-login.dto'
import { GoogleAuthService } from '../services/google.auth.service'
import { IThirdPartyLoginPayload, thirdPartyLoginMethodType } from '../../common/interfaces/types'
import { GithubAuthService } from '../services/github.auth.service'
import { FacebookAuthService } from '../services/facebook.auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly googleAuthService: GoogleAuthService,
    private readonly githubAuthService: GithubAuthService, private readonly facebookAuthService: FacebookAuthService) {
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
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

  // Third-party Login
  @Post('third-party')
  @HttpCode(HttpStatus.OK)
  @Public()
  async thirdPartyAuth(@Body() body: ThirdPartyLoginDto, @Request() req) {
    const { token, method } = body

    const payload: IThirdPartyLoginPayload = await this.getThirdPartyService(method).getPayloadFromToken(token)
    const { accessToken } = await this.authService.thirdPartyLogin(payload)

    return { accessToken }
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  getThirdPartyService(method: thirdPartyLoginMethodType) {
    switch (method) {
    case 'GOOGLE':
      return this.googleAuthService

    case 'GITHUB':
      return this.githubAuthService
    case 'FACEBOOK':
      return this.facebookAuthService
    }

  }
}
