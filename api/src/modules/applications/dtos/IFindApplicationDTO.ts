import { IApplication } from '../domain/IApplication'

export interface IFindApplicationRequestDTO {
  page: number
  pageSize: number
  userId: string
  search?: string
}

export interface IFindApplicationResponseDTO {
  data: IApplication[]
  items: number
  pages: number
}
