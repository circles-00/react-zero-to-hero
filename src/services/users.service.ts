import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { QueryRunner, Repository } from 'typeorm'
import { CreateUserDto } from '../dto/user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    queryRunner: QueryRunner,
  ): Promise<User> {
    const user: User = this.usersRepository.create({
      ...createUserDto,
    })

    return queryRunner.manager.save(user)
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    })
  }
}
