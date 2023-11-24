import { IUser } from '../domain/IUser'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>
  update(data: IUpdateUserDTO): Promise<IUser>
  findById(userId: string): Promise<IUser | null>
  findByEmail(userEmail: string): Promise<IUser | null>
}
