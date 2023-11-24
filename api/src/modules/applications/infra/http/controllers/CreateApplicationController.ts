import { Joi, Segments, celebrate } from 'celebrate'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateApplicationService } from '../../../services/CreateApplicationService'

export class CreateApplicationController {
  static route = '/'

  static validator = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      loginUrl: Joi.string().uri().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  })

  async handle(request: Request, response: Response) {
    const { name, loginUrl, email, password } = request.body
    const { id } = request.user

    const createApplicationService = container.resolve(CreateApplicationService)
    const createdApplication = await createApplicationService.execute({
      name,
      loginUrl,
      email,
      password,
      userId: id,
    })

    return response.status(201).json(createdApplication)
  }
}
