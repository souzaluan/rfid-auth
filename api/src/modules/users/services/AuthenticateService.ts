import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../repositories/IUsersRepository'
import {
  IAuthenticateRequestDTO,
  IAuthenticateResponseDTO,
} from '../dtos/IAuthenticateDTO'
import { HashStrategy } from '../helpers/HashStrategy'
import { sign } from 'jsonwebtoken'
import { BadRequestError } from '../../../common/error/BadRequestError'

@injectable()
export class AuthenticateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequestDTO): Promise<IAuthenticateResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new BadRequestError('E-mail ou senha incorretos.')
    }

    const isCorrectPassword = await HashStrategy.compare({
      raw: password,
      hashed: user.password,
    })

    if (!isCorrectPassword) {
      throw new BadRequestError('E-mail ou senha incorretos.')
    }

    const token = sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET as string,
    )

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    }
  }
}
