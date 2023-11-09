import { DataSource } from 'typeorm'

import { defaultDataSourceOptions } from './helpers/data-source-options'

export const instance = new DataSource(defaultDataSourceOptions)
