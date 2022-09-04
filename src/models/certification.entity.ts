import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserCertification } from './user-certification.entity'
import { IQuestion } from '../common/interfaces/types'

@Entity({ name: 'certification' })
export class Certification extends BaseEntity {
  @Column({ type: 'json' })
  questions: Array<IQuestion>

  @OneToMany(
    () => UserCertification,
    (userCertification) => userCertification.certification,
  )
  userCertification: UserCertification[]
}
