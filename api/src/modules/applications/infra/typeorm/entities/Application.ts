import { UserEntity } from '../../../../users/infra/typeorm/entities/UserEntity'
import { IApplication } from '../../../domain/IApplication'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IUser } from 'modules/users/domain/IUser'

@Entity('applications')
export class ApplicationEntity implements IApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'login_url' })
  loginUrl: string

  @Column()
  name: string

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: IUser

  @Column({ name: 'user_id' })
  userId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
