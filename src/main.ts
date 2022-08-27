import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from './common/helpers/exceptions/filters/global-filter'
import { initMigrations } from './database/init'

async function bootstrap() {
  await initMigrations()
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.setGlobalPrefix('api')
  await app.listen(5000)
}
bootstrap()
