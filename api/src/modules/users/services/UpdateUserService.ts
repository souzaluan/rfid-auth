import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IUpdateUserRequestDTO } from '../dtos/IUpdateUserDTO'
import { NotFoundError } from '../../../common/error/NotFoundError'
import { BadRequestError } from '../../../common/error/BadRequestError'
import { HashStrategy } from '../helpers/HashStrategy'
import { IUserResponseDTO } from '../dtos/IUserResponseDTO'

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    email,
    password,
    confirmPassword,
  }: IUpdateUserRequestDTO): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.')
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)

      if (userWithSameEmail) {
        throw new BadRequestError('Esse e-mail já está sendo utilizado.')
      }
    }

    if (password) {
      const passwordAndConfirmAreEquals = password === confirmPassword

      if (!passwordAndConfirmAreEquals) {
        throw new BadRequestError('Senha e confirmação devem ser iguais.')
      }

      password = await HashStrategy.hash(password)
    }

    const updatedUser = await this.usersRepository.update({
      id,
      email,
      password,
    })

    return {
      id: updatedUser.id,
      email: updatedUser.email,
    }
  }
}
