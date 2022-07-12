import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { UsersService } from '../../services/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../../models/user.entity'
import { compareSync } from 'bcryptjs'
import { Connection, Repository } from 'typeorm'
import { PostgresErrorCode } from '../../database/constraints'
import { UserAlreadyExistException } from '../../common/helpers/exceptions/user-already-exists.exception'
import { RegistrationDto } from '../../dto/registration.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { IThirdPartyLoginPayload } from '../../common/interfaces/types'
import { MailService } from '../../services/mail.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly connection: Connection,
    private readonly mailService: MailService,
  ) {}

  comparePasswords(password: string, hash: string) {
    return compareSync(password, hash)
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email)
    if (user && this.comparePasswords(password, user.password)) {
      // Used to remove password from object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    return this.getAccessToken(user)
  }

  getAccessToken({ id, firstName, lastName, email }: User) {
    return {
      accessToken: this.jwtService.sign({ id, firstName, lastName, email }),
    }
  }

  async registration(registrationDto: RegistrationDto): Promise<User> {
    let user: User
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      user = await this.userService.createUser(registrationDto, queryRunner)

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()

      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException()
      }

      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
    }

    return user
  }

  async thirdPartyLogin(payload: IThirdPartyLoginPayload) {
    const { email } = payload
    if (!email) throw new Error('Invalid payload')

    const userExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    })

    if (userExists) return this.getAccessToken(userExists)

    const createdUser = await this.usersRepository.save({
      ...payload,
      password: '',
    })
    return this.getAccessToken(createdUser)
  }

  async resetPassword(email: string, appUrl: string) {
    const userFromDb = await this.usersRepository.findOne({
      where: {
        email,
      },
    })

    if (!userFromDb) throw new Error("User doesn't exist")
    const { accessToken } = this.getAccessToken(userFromDb)

    return this.mailService.sendResetPasswordConfirmation(
      accessToken,
      email,
      appUrl,
    )
  }

  resetPasswordConfirm(user, password) {
    return this.usersRepository
      .createQueryBuilder()
      .update({
        password,
      })
      .where({
        id: user.id,
      })
      .returning('*')
      .execute()
  }
}
