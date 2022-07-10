import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common'
import { LessonsService } from '../services/lessons.service'
import { JwtAuthGuard } from '../common/helpers/guards/jwt-auth.guard'

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllLessons(@Request() req) {
    return this.lessonsService.findAll({ userId: req.user.id })
  }
}
