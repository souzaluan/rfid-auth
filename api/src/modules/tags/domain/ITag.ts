import { IUserEntity } from '../../users/domain/IUserEntity'

export interface ITag {
  id: string
  code: string
  name: string
  user: IUserEntity
  userId: string
}
