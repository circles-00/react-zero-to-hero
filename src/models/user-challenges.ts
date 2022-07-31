import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Challenge } from './challenge.entity'
import { User } from './user.entity'

@Entity('user-challenges')
export class UserChallenges extends BaseEntity {
  @Column()
  userId: string

  @Column()
  challengeId: string

  @Column()
  isDone: boolean

  @ManyToOne(() => User, (user) => user.userLessons)
  user: User

  @ManyToOne(() => Challenge, (challenge) => challenge.userChallenges)
  challenge: Challenge
}
