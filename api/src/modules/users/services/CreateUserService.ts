import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { HashStrategy } from '../helpers/HashStrategy'
import { BadRequestError } from '../../../common/error/BadRequestError'
import { IUserResponseDTO } from '../dtos/IUserResponseDTO'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
    tag,
  }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new BadRequestError('Usuário já cadastrado.')
    }

    const hashedPassword = await HashStrategy.hash(password)

    const createdUser = await this.usersRepository.create({
      email,
      password: hashedPassword,
      tag,
    })

    return {
      id: createdUser.id,
      email: createdUser.email,
    }
  }
}
