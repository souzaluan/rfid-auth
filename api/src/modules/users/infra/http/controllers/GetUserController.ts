import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserService } from '../../../services/GetUserService'

export class GetUserController {
  static route = '/me'

  async handle(request: Request, response: Response) {
    const { id } = request.user

    const getUserService = container.resolve(GetUserService)
    const user = await getUserService.execute(id)

    return response.status(200).json(user)
  }
}
