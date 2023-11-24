import { IUser } from '../../users/domain/IUser'

export interface ITag {
  id: string
  code: string
  name: string
  user: IUser
  userId: string
}
