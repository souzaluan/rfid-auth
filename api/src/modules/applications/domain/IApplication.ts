import { IUser } from '../../users/domain/IUser'

export interface IApplication {
  id: string
  name: string
  loginUrl: string
  email: string
  password: string
  user: IUser
  userId: string
  createdAt: Date
  updatedAt: Date
}
