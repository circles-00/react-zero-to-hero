import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PracticeController } from '../controllers/practice.controller'
import { Challenge } from '../models/challenge.entity'
import { UserChallenges } from '../models/user-challenges'
import { PracticeService } from '../services/practice.service'

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, UserChallenges])],
  controllers: [PracticeController],
  providers: [PracticeService],
  exports: [PracticeService],
})
export class PracticeModule {}
