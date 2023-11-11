import 'dotenv/config'

import { DataSource } from 'typeorm'

import { defaultDataSourceOptions } from './helpers/dataSourceOptions'

export const instance = new DataSource(defaultDataSourceOptions)
