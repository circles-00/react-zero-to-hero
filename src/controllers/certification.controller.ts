import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CertificationService } from '../services/certification.service'
import { JwtAuthGuard } from '../common/helpers/guards/jwt-auth.guard'
import { CheckAnswerDto } from '../dto/check-answer.dto'

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getCertificationData(@Req() req) {
    const { user } = req
    return await this.certificationService.getCertificationData(user)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/checkAnswer')
  async checkAnswer(@Req() req, @Body() checkAnswerDto: CheckAnswerDto) {
    const { user } = req

    return await this.certificationService.checkAnswer(checkAnswerDto, user)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/beginCertification')
  async beginCertification(@Req() req) {
    const { user } = req

    return await this.certificationService.beginCertification(user)
  }
}
