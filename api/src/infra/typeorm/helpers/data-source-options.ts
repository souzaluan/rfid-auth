import { DataSourceOptions } from 'typeorm'
import { resolve } from 'node:path'
import { databaseConfig } from 'config/database'

export const defaultDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  migrationsRun: false,
  entities: [resolve('src', 'modules', '**', 'entities', '*.{js,ts}')],
  migrations: [resolve('src', 'infra', '**', 'migrations', '*.{js,ts}')],
}
