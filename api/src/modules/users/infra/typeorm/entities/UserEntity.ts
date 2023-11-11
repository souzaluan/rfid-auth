import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { IUserEntity } from '../../../domain/IUserEntity'

@Entity('users')
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string
}
