import { BadRequestException } from '@nestjs/common'

export class UserAlreadyExistException extends BadRequestException {
  constructor(error?: string) {
    super('User already exists', error)
  }
}
