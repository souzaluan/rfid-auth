import { Joi, Segments, celebrate } from 'celebrate'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FindApplicationService } from '../../../services/FindApplicationService'

export class FindApplicationController {
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

    const findApplicationService = container.resolve(FindApplicationService)
    const applications = await findApplicationService.execute({
      userId: id,
      page: Number(page),
      pageSize: Number(pageSize),
      search: search as string | undefined,
    })

    return response.json(applications)
  }
}
