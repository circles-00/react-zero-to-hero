import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { Lesson } from './lessons.entity'

@Entity('user-lessons')
export class UserLessons extends BaseEntity {
  @Column()
  userId: string

  @Column()
  lessonId: string

  @Column()
  isDone: boolean

  @ManyToOne(() => User, (user) => user.userLessons)
  user: User

  @ManyToOne(() => Lesson, (lesson) => lesson.userLessons)
  lesson: Lesson
}
