import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { NotFoundError } from '../../../common/error/NotFoundError'
import { IUserResponseDTO } from '../dtos/IUserResponseDTO'

@injectable()
export class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.')
    }

    return {
      id: user.id,
      email: user.email,
    }
  }
}
