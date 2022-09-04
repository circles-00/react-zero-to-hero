import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from '../auth/modules/auth.module'
import { configService } from '../config/config.service'
import { AppController } from '../controllers/app.controller'
import { User } from '../models/user.entity'
import { AppService } from '../services/app.service'
import { LessonsModule } from './lessons.module'
import { MailModule } from './mail.module'
import { PracticeModule } from './practice.module'
import { UsersModule } from './users.module'
import { CertificationModule } from './certification.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User]),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    LessonsModule,
    MailModule,
    PracticeModule,
    CertificationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
