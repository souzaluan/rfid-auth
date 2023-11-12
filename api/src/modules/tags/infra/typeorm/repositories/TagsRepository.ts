import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { ITagsRepository } from '../../../repositories/ITagsRepository'
import { ITag } from '../../../domain/ITag'
import { getRepository } from '../../../../../infra/typeorm/helpers/connection'
import { Tag } from '../entities/Tag'
import { ICreateTagDTO } from '../../../dtos/ICreateTagDTO'
import { IFindTagRequestDTO } from '../../../dtos/IFindTagDTO'

export class TagsRepository implements ITagsRepository {
  private repository: Repository<ITag>

  constructor() {
    this.repository = getRepository(Tag)
  }

  async create(data: ICreateTagDTO) {
    const createdTag = this.repository.create(data)

    return this.repository.save(createdTag)
  }

  async find({ page, pageSize, search, userId }: IFindTagRequestDTO) {
    const where: FindOptionsWhere<ITag> = { userId }

    if (search) {
      where.name = ILike(`%${search}%`)
    }

    const ignoreItemsLength = (page - 1) * pageSize

    const [data, items] = await this.repository.findAndCount({
      skip: ignoreItemsLength,
      take: pageSize,
      where,
    })

    const pages = Math.ceil(items / pageSize)

    return {
      data,
      items,
      pages,
    }
  }

  async findByCodeAndUser(tagCode: string, userId: string) {
    const tag = await this.repository.findOneBy({ code: tagCode, userId })

    return tag
  }
}
