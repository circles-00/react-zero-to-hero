import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserLessons } from './user-lessons.entity'
import { UserCertification } from './user-certification.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({
    unique: true,
  })
  email: string

  @Column()
  password?: string

  @Column({
    nullable: true,
  })
  googleId: string

  @Column({
    nullable: true,
  })
  githubId: string

  @Column({
    nullable: true,
  })
  facebookId: string

  @OneToMany(() => UserLessons, (userLessons) => userLessons.user)
  userLessons: UserLessons[]

  @OneToMany(
    () => UserCertification,
    (userCertifications) => userCertifications.user,
  )
  userCertifications: UserCertification[]
}
