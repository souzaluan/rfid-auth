import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { HashStrategy } from '../helpers/HashStrategy'
import { UsersRepository } from '../infra/inMemory/repositories/UsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { AuthenticateService } from './AuthenticateService'
import { BadRequestError } from '../../../common/error/BadRequestError'

let usersRepository: IUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be possible authenticate', async () => {
    const createUserData: ICreateUserDTO = {
      email: 'luan@souza.com',
      password: await HashStrategy.hash('123'),
    }

    await usersRepository.create(createUserData)

    const response = await sut.execute({
      email: 'luan@souza.com',
      password: '123',
    })

    expect(response.user.email).toBe(createUserData.email)
    expect(response.token).toStrictEqual(expect.any(String))
  })

  it('should not be possible authenticate if email is not correct', async () => {
    await usersRepository.create({
      email: 'luan@souza.com',
      password: await HashStrategy.hash('123'),
    })

    await expect(
      sut.execute({
        email: 'luan@email.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should not be possible authenticate if password is not correct', async () => {
    await usersRepository.create({
      email: 'luan@souza.com',
      password: await HashStrategy.hash('123'),
    })

    await expect(
      sut.execute({
        email: 'luan@souza.com',
        password: '12356',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
