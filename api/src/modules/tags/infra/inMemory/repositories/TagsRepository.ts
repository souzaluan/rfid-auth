import { ITag } from '../../../domain/ITag'
import { ICreateTagDTO } from '../../../dtos/ICreateTagDTO'
import { IFindTagRequestDTO } from '../../../dtos/IFindTagDTO'
import { ITagsRepository } from '../../../repositories/ITagsRepository'
import { IUser } from '../../../../users/domain/IUser'

export class TagsRepository implements ITagsRepository {
  private tags: ITag[] = []

  async create(data: ICreateTagDTO) {
    const createTagData: ITag = {
      id: `tag-${this.tags.length}`,
      user: {} as IUser,
      ...data,
    }

    this.tags.push(createTagData)

    return Promise.resolve(createTagData)
  }

  async find({ page, pageSize, search, userId }: IFindTagRequestDTO) {
    let result = this.tags.filter((tag) => tag.userId === userId)

    if (search) {
      result = result.filter((tag) =>
        tag.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    result = result.slice((page - 1) * pageSize, page * pageSize)

    return Promise.resolve({
      data: result,
      items: result.length,
      pages: Math.ceil(result.length / pageSize),
    })
  }

  async findById(tagId: string): Promise<ITag | null> {
    const tag = this.tags.find((tag) => tag.id === tagId) ?? null

    return tag
  }

  async findByCodeAndUser(tagCode: string, userId: string) {
    const tag =
      this.tags.find((tag) => tag.code === tagCode && tag.userId === userId) ??
      null

    return Promise.resolve(tag)
  }
}
