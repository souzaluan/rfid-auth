import { container } from 'tsyringe'

import { IUsersRepository } from '../modules/users/repositories/IUsersRepository'
import { UsersRepository } from '../modules/users/infra/typeorm/repositories/UsersRepository'
import { IApplicationsRepository } from '../modules/applications/repositories/IApplicationsRepository'
import { ApplicationsRepository } from '../modules/applications/infra/typeorm/repositories/ApplicationsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
container.registerSingleton<IApplicationsRepository>(
  'ApplicationsRepository',
  ApplicationsRepository,
)
