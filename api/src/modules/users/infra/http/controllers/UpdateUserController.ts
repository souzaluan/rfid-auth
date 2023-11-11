import { Joi, Segments, celebrate } from 'celebrate'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserService } from '../../../services/UpdateUserService'

export class UpdateUserController {
  static route = '/'

  static validator = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email(),
      password: Joi.string(),
      confirmPassword: Joi.string(),
    },
  })

  async handle(request: Request, response: Response) {
    const { email, password, confirmPassword } = request.body
    const { id } = request.user

    const updateUserService = container.resolve(UpdateUserService)
    const updatedUser = await updateUserService.execute({
      id,
      email,
      password,
      confirmPassword,
    })

    return response.status(200).json(updatedUser)
  }
}
