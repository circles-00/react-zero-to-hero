import { Entity, Column, ManyToMany, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity';
import { UserLessons } from './user-lessons.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    unique: true
  })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column({
    nullable: true
  })
  googleId: string;

  @OneToMany(() => UserLessons, userLessons => userLessons.user)
  userLessons: UserLessons[]
}
