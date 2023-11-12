import { TagsRepository } from '../infra/inMemory/repositories/TagsRepository'
import { ITagsRepository } from '../repositories/ITagsRepository'
import { FindTagService } from './FindTagService'

let tagsRepository: ITagsRepository
let sut: FindTagService

describe('Find Tag Service', () => {
  beforeEach(() => {
    tagsRepository = new TagsRepository()
    sut = new FindTagService(tagsRepository)
  })

  it('should be possible find tag', async () => {
    for (let index = 0; index < 12; index++) {
      await tagsRepository.create({
        code: index.toString(),
        name: `tag#${index}`,
        userId: 'user-id',
      })
    }

    const tags = await sut.execute({
      page: 2,
      pageSize: 10,
      userId: 'user-id',
    })

    expect(tags.data).toHaveLength(2)
    expect(tags.data).toStrictEqual(
      expect.objectContaining([
        {
          code: '10',
          id: 'tag-10',
          name: 'tag#10',
          user: {},
          userId: 'user-id',
        },
        {
          code: '11',
          id: 'tag-11',
          name: 'tag#11',
          user: {},
          userId: 'user-id',
        },
      ]),
    )
  })

  it("should be possible just user's tag", async () => {
    for (let index = 0; index < 5; index++) {
      await tagsRepository.create({
        code: index.toString(),
        name: `tag#${index}`,
        userId: `user-id-${index}`,
      })
    }

    const tags = await sut.execute({
      page: 1,
      pageSize: 10,
      userId: 'user-id-1',
    })

    expect(tags.data).toHaveLength(1)
    expect(tags.data).toStrictEqual(
      expect.objectContaining([
        {
          code: '1',
          id: 'tag-1',
          name: 'tag#1',
          user: {},
          userId: 'user-id-1',
        },
      ]),
    )
  })

  it('should be possible find tag searching by name', async () => {
    for (let index = 0; index < 5; index++) {
      await tagsRepository.create({
        code: index.toString(),
        name: `tag#${index}`,
        userId: 'user-id',
      })
    }

    const tags = await sut.execute({
      page: 1,
      pageSize: 10,
      userId: 'user-id',
      search: 'tag#4',
    })

    expect(tags.data).toHaveLength(1)
    expect(tags.data).toStrictEqual(
      expect.objectContaining([
        {
          code: '4',
          id: 'tag-4',
          name: 'tag#4',
          user: {},
          userId: 'user-id',
        },
      ]),
    )
  })
})
