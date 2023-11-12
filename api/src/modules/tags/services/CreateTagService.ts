import { inject, injectable } from 'tsyringe'
import { ITagsRepository } from '../repositories/ITagsRepository'
import { ICreateTagDTO } from '../dtos/ICreateTagDTO'
import { BadRequestError } from '../../../common/error/BadRequestError'
import { ITag } from '../domain/ITag'

@injectable()
export class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  async execute({ code, name, userId }: ICreateTagDTO): Promise<ITag> {
    const tag = await this.tagsRepository.findByCodeAndUser(code, userId)

    if (tag) {
      throw new BadRequestError('Já existe uma tag com o mesmo código.')
    }

    const createdTag = await this.tagsRepository.create({
      code,
      name,
      userId,
    })

    return createdTag
  }
}
