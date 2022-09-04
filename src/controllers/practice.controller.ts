import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../common/helpers/guards/jwt-auth.guard'
import { PracticeService } from '../services/practice.service'
import { CheckAnswerDto } from '../dto/check-answer.dto'

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAllChallenges(@Request() req) {
    const { user } = req
    return await this.practiceService.getAllChallenges({ userId: user.id })
  }

  @Post('/checkAnswer')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async checkAnswer(@Request() req, @Body() checkAnswerDto: CheckAnswerDto) {
    const { user } = req
    return await this.practiceService.checkAnswer(checkAnswerDto, user.id)
  }
}
