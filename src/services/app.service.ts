import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { Repository } from 'typeorm'
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHello(): any {
    return this.usersRepository.find()
  }
}
