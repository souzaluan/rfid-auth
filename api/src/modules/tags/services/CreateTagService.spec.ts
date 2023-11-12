import { BadRequestError } from '../../../common/error/BadRequestError'
import { CreateTagService } from './CreateTagService'
import { TagsRepository } from '../infra/inMemory/repositories/TagsRepository'
import { ITagsRepository } from '../repositories/ITagsRepository'
import { ICreateUserDTO } from '../../users/dtos/ICreateUserDTO'
import { IUsersRepository } from '../../users/repositories/IUsersRepository'
import { UsersRepository } from '../../users/infra/inMemory/repositories/UsersRepository'

let usersRepository: IUsersRepository
let tagsRepository: ITagsRepository
let sut: CreateTagService

describe('Create Tag Service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    tagsRepository = new TagsRepository()
    sut = new CreateTagService(tagsRepository)
  })

  it('should be possible create tag', async () => {
    const createUserData: ICreateUserDTO = {
      email: 'luan@souza.com',
      password: '123',
    }

    const createdUser = await usersRepository.create(createUserData)

    const response = await sut.execute({
      code: 'D1 D2 D4',
      name: 'tag#01',
      userId: createdUser.id,
    })

    expect(response.code).toBe('D1 D2 D4')
  })

  it('should not be possible create tag if code already registered on same account', async () => {
    const createUserData: ICreateUserDTO = {
      email: 'luan@souza.com',
      password: '123',
    }

    const createdUser = await usersRepository.create(createUserData)

    await sut.execute({
      code: 'D1 D2 D4',
      name: 'tag#01',
      userId: createdUser.id,
    })

    await expect(
      sut.execute({
        code: 'D1 D2 D4',
        name: 'tag#02',
        userId: createdUser.id,
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
