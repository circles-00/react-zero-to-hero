import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserChallenges } from './user-challenges'

@Entity({ name: 'challenges' })
export class Challenge extends BaseEntity {
  @Column()
  title: string

  @Column()
  shortDescription: string

  @Column()
  description: string

  @Column()
  difficulty: number

  @Column({ type: 'json' })
  answers: string

  @Column()
  rightAnswer: string

  @OneToMany(() => UserChallenges, (userChallenges) => userChallenges.challenge)
  userChallenges: UserChallenges[]
}
