import { Joi, Segments, celebrate } from 'celebrate'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTagService } from '../../../services/CreateTagService'

export class CreateTagController {
  static route = '/'

  static validator = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      code: Joi.string().required(),
    },
  })

  async handle(request: Request, response: Response) {
    const { name, code } = request.body
    const { id } = request.user

    const createTagService = container.resolve(CreateTagService)
    const createdTag = await createTagService.execute({
      code,
      name,
      userId: id,
    })

    return response.status(201).json(createdTag)
  }
}
