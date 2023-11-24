import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { UsersRepository } from '../infra/inMemory/repositories/UsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { BadRequestError } from '../../../common/error/BadRequestError'
import { CreateUserService } from './CreateUserService'
import { HashStrategy } from '../helpers/HashStrategy'
import { IUser } from '../domain/IUser'

let usersRepository: IUsersRepository
let sut: CreateUserService

describe('Create User Service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    sut = new CreateUserService(usersRepository)
  })

  it('should be possible create user', async () => {
    const user = await sut.execute({
      email: 'luan@souza.com',
      password: '123',
    })

    expect(user.email).toBe('luan@souza.com')
  })

  it('should not be possible create user with an already registered email', async () => {
    const createUserData: ICreateUserDTO = {
      email: 'luan@souza.com',
      password: '123',
    }

    await sut.execute(createUserData)

    expect(sut.execute(createUserData)).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should correctly hash usear password', async () => {
    const createdUser = await sut.execute({
      email: 'luan@souza.com',
      password: '123',
    })

    const createdUserWithPassword = (await usersRepository.findById(
      createdUser.id,
    )) as IUser

    const passwordIsCorrectlyHashed = await HashStrategy.compare({
      raw: '123',
      hashed: createdUserWithPassword?.password,
    })

    expect(passwordIsCorrectlyHashed).toBeTruthy()
  })
})
