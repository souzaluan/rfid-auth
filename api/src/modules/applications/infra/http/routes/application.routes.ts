import { Router } from 'express'
import { authenticated } from '../../../../../middlewares/auth'
import { CreateApplicationController } from '../controllers/CreateApplicationController'
import { FindApplicationController } from '../controllers/FindApplicationController'

export const routes = Router()

const findApplicationController = new FindApplicationController()
const createApplicationController = new CreateApplicationController()

routes.post(
  CreateApplicationController.route,
  authenticated,
  CreateApplicationController.validator,
  createApplicationController.handle,
)

routes.get(
  FindApplicationController.route,
  authenticated,
  FindApplicationController.validator,
  findApplicationController.handle,
)
