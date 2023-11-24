import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { IUser } from '../../../domain/IUser'

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string
}
