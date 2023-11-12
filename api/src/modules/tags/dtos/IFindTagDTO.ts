import { ITag } from '../domain/ITag'

export interface IFindTagRequestDTO {
  page: number
  pageSize: number
  userId: string
  search?: string
}

export interface IFindTagResponseDTO {
  data: ITag[]
  items: number
  pages: number
}
