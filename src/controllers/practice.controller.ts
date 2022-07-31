import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/helpers/guards/jwt-auth.guard'
import { PracticeService } from '../services/practice.service'

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAllChallenges(@Request() req) {
    const { user } = req
    return await this.practiceService.getAllChallenges({ userId: user.id })
  }
}
