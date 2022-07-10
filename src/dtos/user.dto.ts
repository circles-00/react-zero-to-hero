import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string
}
