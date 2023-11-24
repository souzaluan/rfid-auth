import { UsersRepository } from '../infra/inMemory/repositories/UsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { NotFoundError } from '../../../common/error/NotFoundError'
import { GetUserService } from './GetUserService'

let usersRepository: IUsersRepository
let sut: GetUserService

describe('Get User Service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    sut = new GetUserService(usersRepository)
  })

  it('should be possible get user', async () => {
    const createdUser = await usersRepository.create({
      email: 'luan@souza.com',
      password: '123',
      tag: 'any-tag-code',
    })

    const user = await sut.execute(createdUser.id)

    expect(user.id).toBe('user-0')
    expect(user.email).toBe('luan@souza.com')
  })

  it('should not be possible get inexistent user', async () => {
    await expect(sut.execute('inexistent-user-id')).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })
})
