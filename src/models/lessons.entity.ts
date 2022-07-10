import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserLessons } from './user-lessons.entity'

@Entity({ name: 'lessons' })
export class Lesson extends BaseEntity {
  @Column()
  title: string

  @Column()
  shortDescription: string

  @Column()
  description: string

  @Column()
  difficulty: number

  @OneToMany(() => UserLessons, (userLessons) => userLessons.lesson)
  userLessons: UserLessons[]
}
