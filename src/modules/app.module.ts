import { Module } from '@nestjs/common'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { configService } from '../config/config.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { AuthModule } from '../auth/modules/auth.module'
import { UsersModule } from './users.module'
import { ScheduleModule } from '@nestjs/schedule'
import { LessonsModule } from './lessons.module'
import { MailModule } from './mail.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User]),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    LessonsModule,
    MailModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
