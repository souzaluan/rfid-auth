import { UsersRepository } from '../infra/inMemory/repositories/UsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { NotFoundError } from '../../../common/error/NotFoundError'
import { UpdateUserService } from './UpdateUserService'
import { IUpdateUserRequestDTO } from '../dtos/IUpdateUserDTO'
import { HashStrategy } from '../helpers/HashStrategy'
import { IUser } from '../domain/IUser'
import { BadRequestError } from '../../../common/error/BadRequestError'

let usersRepository: IUsersRepository
let sut: UpdateUserService

describe('Update User Service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    sut = new UpdateUserService(usersRepository)
  })

  it('should be possible update user', async () => {
    const createdUser = await usersRepository.create({
      email: 'luan@souza.com',
      password: '123',
    })

    const updatedUser = await sut.execute({
      id: createdUser.id,
      email: 'updated@email.com',
    })

    expect(updatedUser.id).toBe('user-0')
    expect(updatedUser.email).toBe('updated@email.com')
  })

  it('should not be possible update inexistent user', async () => {
    const updateUserData: IUpdateUserRequestDTO = {
      id: 'inexistent-user-id',
      email: 'updated@email.com',
    }

    await expect(sut.execute(updateUserData)).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  it('should correctly hash new user password', async () => {
    const createdUser = await usersRepository.create({
      email: 'luan@souza.com',
      password: '123',
    })

    await sut.execute({
      id: createdUser.id,
      password: '12345',
      confirmPassword: '12345',
    })

    const updatedUserWithPassword = (await usersRepository.findById(
      createdUser.id,
    )) as IUser

    const passwordIsCorrectlyHashed = await HashStrategy.compare({
      raw: '12345',
      hashed: updatedUserWithPassword?.password,
    })

    expect(passwordIsCorrectlyHashed).toBeTruthy()
  })

  it('should not be possible update if password and confirm are different', async () => {
    const createdUser = await usersRepository.create({
      email: 'luan@souza.com',
      password: '123',
    })

    await expect(
      sut.execute({
        id: createdUser.id,
        password: '12345',
        confirmPassword: '1234578',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should not be possible update if new password already registered', async () => {
    await usersRepository.create({
      email: 'already-registered@email.com',
      password: '12345',
    })

    const createdUser = await usersRepository.create({
      email: 'luan@souza.com',
      password: '123',
    })

    await expect(
      sut.execute({
        id: createdUser.id,
        email: 'already-registered@email.com',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should not return user password', async () => {
    const createdUser = await usersRepository.create({
      email: 'luan@souza.com',
      password: '123',
    })

    const updatedUser = await sut.execute({
      id: createdUser.id,
      email: 'updated@email.com',
      password: '12345',
      confirmPassword: '12345',
    })

    expect(updatedUser).not.toHaveProperty('password')
    expect(updatedUser).not.toHaveProperty('confirmPassword')
  })
})
