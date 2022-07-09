import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from '../../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models/user.entity';
import { compareSync } from 'bcryptjs';
import { Connection, QueryRunner, Repository } from 'typeorm'
import { CreateUserDto } from '../../dtos/user.dto'
import { PostgresErrorCode } from '../../database/constraints'
import { UserAlreadyExistException } from '../../exceptions/user-already-exists.exception'
import { RegistrationDto } from '../../dtos/registration.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly connection: Connection
  ) {}

  comparePasswords(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && this.comparePasswords(password, user.password)) {
      // Used to remove password from object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email  };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(registrationDto: RegistrationDto): Promise<User> {
    let user: User;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      user = await this.userService.createUser(
        registrationDto,
        queryRunner
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException();
      }

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return user;
  }
}
