import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { Certification } from './certification.entity'
import { ICertificationProgress } from '../common/interfaces/types'

@Entity('user-certification')
export class UserCertification extends BaseEntity {
  @Column()
  userId: string

  @Column()
  certificationId: string

  @Column()
  isDone: boolean

  @ManyToOne(() => User, (user) => user.userCertifications)
  user: User

  @ManyToOne(
    () => Certification,
    (certification) => certification.userCertification,
  )
  certification: Certification

  @Column({ type: 'timestamptz' })
  dueDate: Date

  @Column({ type: 'text' })
  certificate: string

  @Column({ type: 'json', nullable: true })
  progress: ICertificationProgress
}
