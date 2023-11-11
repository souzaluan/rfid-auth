import { Joi, Segments, celebrate } from 'celebrate'
import { Request, Response } from 'express'
import { AuthenticateService } from '../../../services/AuthenticateService'
import { container } from 'tsyringe'

export class AuthenticateController {
  static route = '/authenticate'

  static validator = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  })

  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateService = container.resolve(AuthenticateService)
    const authenticated = await authenticateService.execute({ email, password })

    return response.status(200).json(authenticated)
  }
}
