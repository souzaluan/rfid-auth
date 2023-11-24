import { IUser } from '../domain/IUser'

export type IUserResponseDTO = Omit<IUser, 'password' | 'tag'>
