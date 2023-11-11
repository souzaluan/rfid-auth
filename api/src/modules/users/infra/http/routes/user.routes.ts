import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { authenticated } from '../../../../../middlewares/auth'
import { AuthenticateController } from '../controllers/AuthenticateController'
import { GetUserController } from '../controllers/GetUserController'
import { UpdateUserController } from '../controllers/UpdateUserController'

export const routes = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateController()
const getUserController = new GetUserController()
const updateUserController = new UpdateUserController()

routes.post(
  CreateUserController.route,
  CreateUserController.validator,
  createUserController.handle,
)

routes.post(
  AuthenticateController.route,
  AuthenticateController.validator,
  authenticateController.handle,
)

routes.get(GetUserController.route, authenticated, getUserController.handle)

routes.patch(
  UpdateUserController.route,
  authenticated,
  UpdateUserController.validator,
  updateUserController.handle,
)
