import { Router } from 'express'

import { routes as users } from '../../../modules/users/infra/http/routes/user.routes'
import { routes as applications } from '../../../modules/applications/infra/http/routes/application.routes'

export const routes = Router()

routes.use('/users', users)
routes.use('/applications', applications)
