import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'
import { LessonsService } from '../services/lessons.service'
import { JwtAuthGuard } from '../common/helpers/guards/jwt-auth.guard'
import { LessonDoneDto } from '../dto/lesson-done.dto'

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllLessons(@Request() req) {
    return this.lessonsService.findAll({ userId: req.user.id })
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async markLessonAsDone(@Request() req, @Body() lessonDoneDto: LessonDoneDto) {
    const { lessonId } = lessonDoneDto
    return this.lessonsService.markLessonAsDone(lessonId, req.user.id)
  }
}
