import { Joi, Segments, celebrate } from 'celebrate'
import { Request, Response } from 'express'
import { FindTagService } from '../../../services/FindTagService'
import { container } from 'tsyringe'

export class FindTagController {
  static route = '/'

  static validator = celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().required(),
      search: Joi.string(),
    },
  })

  async handle(request: Request, response: Response) {
    const { page, pageSize, search } = request.query
    const { id } = request.user

    const findTagService = container.resolve(FindTagService)
    const tags = await findTagService.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      search: search as string | undefined,
      userId: id,
    })

    return response.json(tags)
  }
}
