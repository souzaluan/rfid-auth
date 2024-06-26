import { IUser } from 'modules/users/domain/IUser'
import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from 'modules/users/dtos/IUpdateUserDTO'
import { IUsersRepository } from 'modules/users/repositories/IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private users: IUser[] = []

  async create(data: ICreateUserDTO) {
    const createUserData: IUser = {
      id: `user-${this.users.length}`,
      ...data,
    }

    this.users.push(createUserData)

    return Promise.resolve(createUserData)
  }

  async update(data: IUpdateUserDTO) {
    const toUpdateUserIndex = this.users.findIndex(
      (user) => user.id === data.id,
    )

    const updateUserData: IUser = {
      ...this.users[toUpdateUserIndex],
      ...data,
    }

    this.users[toUpdateUserIndex] = updateUserData

    return Promise.resolve(updateUserData)
  }

  async findById(userId: string) {
    const user = this.users.find((user) => user.id === userId) ?? null

    return Promise.resolve(user)
  }

  async findByEmail(userEmail: string) {
    const user = this.users.find((user) => user.email === userEmail) ?? null

    return Promise.resolve(user)
  }
}
