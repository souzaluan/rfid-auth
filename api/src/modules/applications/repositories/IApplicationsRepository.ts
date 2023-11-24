import { IApplication } from '../domain/IApplication'
import { ICreateApplicationDTO } from '../dtos/ICreateApplicationDTO'
import {
  IFindApplicationRequestDTO,
  IFindApplicationResponseDTO,
} from '../dtos/IFindApplicationDTO'

export interface IApplicationsRepository {
  create(data: ICreateApplicationDTO): Promise<IApplication>
  find(query: IFindApplicationRequestDTO): Promise<IFindApplicationResponseDTO>
  findByLoginUrl(loginUrl: string): Promise<IApplication | null>
}
