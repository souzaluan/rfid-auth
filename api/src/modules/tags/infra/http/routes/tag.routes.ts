import { Router } from 'express'
import { FindTagController } from '../controllers/FindTagController'
import { authenticated } from '../../../../../middlewares/auth'
import { CreateTagController } from '../controllers/CreateTagController'

export const routes = Router()

const findTagController = new FindTagController()
const createTagController = new CreateTagController()

routes.post(
  CreateTagController.route,
  authenticated,
  CreateTagController.validator,
  createTagController.handle,
)

routes.get(
  FindTagController.route,
  authenticated,
  FindTagController.validator,
  findTagController.handle,
)
