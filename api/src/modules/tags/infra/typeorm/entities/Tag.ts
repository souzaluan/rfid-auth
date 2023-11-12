import { ITag } from '../../../domain/ITag'
import { IUserEntity } from '../../../../users/domain/IUserEntity'
import { UserEntity } from '../../../../users/infra/typeorm/entities/UserEntity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('tags')
export class Tag implements ITag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  code: string

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: IUserEntity

  @Column({ name: 'user_id' })
  userId: string
}
