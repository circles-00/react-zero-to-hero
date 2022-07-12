import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class ResetPasswordConfirmDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string
}
