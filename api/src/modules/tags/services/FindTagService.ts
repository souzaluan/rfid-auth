import { inject, injectable } from 'tsyringe'
import { ITagsRepository } from '../repositories/ITagsRepository'
import { IFindTagRequestDTO } from '../dtos/IFindTagDTO'

@injectable()
export class FindTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  async execute({ page, pageSize, search, userId }: IFindTagRequestDTO) {
    const tags = await this.tagsRepository.find({
      page,
      pageSize,
      search,
      userId,
    })

    return tags
  }
}
