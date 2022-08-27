import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Logger, Injectable } from '@nestjs/common'

import { DataSource, DataSourceOptions } from 'typeorm'

@Injectable()
class ConfigService {
  private readonly logger = new Logger(ConfigService.name)

  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key as string]
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true))
    return this
  }

  public getPort() {
    return this.getValue('PORT', true)
  }

  public isProduction() {
    const mode = this.getValue('MODE', false)
    return mode != 'development'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),

      migrationsTableName: 'migration',

      entities: ['dist/src/models/**/*{.js,.ts}'],
      migrations: ['dist/src/database/migrations/**/*{.js,.ts}'],
      subscribers: [
        'dist/src/subscribers/**/*{.js,.ts}',
        'dist/src/auth/subscribers/**/*{.js,.ts}',
      ],

      ssl: false,
    }
  }

  public getDataSource(): DataSource {
    return new DataSource({
      ...(this.getTypeOrmConfig() as DataSourceOptions),
    })
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
])

export { configService }
