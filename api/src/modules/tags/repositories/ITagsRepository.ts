import { ITag } from '../domain/ITag'
import { ICreateTagDTO } from '../dtos/ICreateTagDTO'
import { IFindTagRequestDTO, IFindTagResponseDTO } from '../dtos/IFindTagDTO'

export interface ITagsRepository {
  create(data: ICreateTagDTO): Promise<ITag>
  find(query: IFindTagRequestDTO): Promise<IFindTagResponseDTO>
  findByCodeAndUser(tagCode: string, userId: string): Promise<ITag | null>
}
