import { IUserEntity } from '../domain/IUserEntity'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUserEntity>
  update(data: IUpdateUserDTO): Promise<IUserEntity>
  findById(userId: string): Promise<IUserEntity | null>
  findByEmail(userEmail: string): Promise<IUserEntity | null>
}
