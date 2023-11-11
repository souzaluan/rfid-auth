import { Router } from 'express'

import { routes as users } from '../../../modules/users/infra/http/routes/user.routes'

export const routes = Router()

routes.use('/users', users)
