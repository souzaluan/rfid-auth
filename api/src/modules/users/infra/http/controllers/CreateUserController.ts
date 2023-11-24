import { Joi, Segments, celebrate } from 'celebrate'
import { Request, Response } from 'express'
import { CreateUserService } from '../../../services/CreateUserService'
import { container } from 'tsyringe'

export class CreateUserController {
  static route = '/'

  static validator = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      tag: Joi.string().required(),
    },
  })

  async handle(request: Request, response: Response) {
    const { email, password, tag } = request.body

    const createUserService = container.resolve(CreateUserService)
    const createdUser = await createUserService.execute({
      email,
      password,
      tag,
    })

    return response.status(201).json(createdUser)
  }
}
