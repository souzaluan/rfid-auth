import { Repository } from 'typeorm'

import { getRepository } from '../../../../../infra/typeorm/helpers/connection'

import { IUsersRepository } from '../../../repositories/IUsersRepository'

import { IUserEntity } from '../../../domain/IUserEntity'
import { UserEntity } from '../entities/UserEntity'

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../../../dtos/IUpdateUserDTO'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<IUserEntity>

  constructor() {
    this.repository = getRepository(UserEntity)
  }

  async create(data: ICreateUserDTO) {
    const createdUser = this.repository.create(data)

    return this.repository.save(createdUser)
  }

  async update(data: IUpdateUserDTO) {
    return this.repository.save(data)
  }

  async findByEmail(userEmail: string) {
    return this.repository.findOneBy({ email: userEmail })
  }

  async findById(userId: string) {
    return this.repository.findOneBy({ id: userId })
  }
}
