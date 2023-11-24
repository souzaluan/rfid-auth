import { container } from 'tsyringe'

import { IUsersRepository } from '../modules/users/repositories/IUsersRepository'
import { UsersRepository } from '../modules/users/infra/typeorm/repositories/UsersRepository'
import { ITagsRepository } from '../modules/tags/repositories/ITagsRepository'
import { TagsRepository } from '../modules/tags/infra/typeorm/repositories/TagsRepository'
import { IApplicationsRepository } from '../modules/applications/repositories/IApplicationsRepository'
import { ApplicationsRepository } from '../modules/applications/infra/typeorm/repositories/ApplicationsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository)
container.registerSingleton<IApplicationsRepository>(
  'ApplicationsRepository',
  ApplicationsRepository,
)
