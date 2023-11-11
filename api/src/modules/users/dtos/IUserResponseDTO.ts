import { IUserEntity } from '../domain/IUserEntity'

export type IUserResponseDTO = Omit<IUserEntity, 'password'>
