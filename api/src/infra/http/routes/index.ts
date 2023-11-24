import { Router } from 'express'

import { routes as users } from '../../../modules/users/infra/http/routes/user.routes'
import { routes as tags } from '../../../modules/tags/infra/http/routes/tag.routes'
import { routes as applications } from '../../../modules/applications/infra/http/routes/application.routes'

export const routes = Router()

routes.use('/users', users)
routes.use('/tags', tags)
routes.use('/applications', applications)
