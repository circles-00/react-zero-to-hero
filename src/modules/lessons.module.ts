import { Module } from '@nestjs/common'
import { LessonsService } from '../services/lessons.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LessonsController } from '../controllers/lessons.controller'
import { UserLessons } from '../models/user-lessons.entity'
import { Lesson } from '../models/lessons.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserLessons, Lesson])],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
