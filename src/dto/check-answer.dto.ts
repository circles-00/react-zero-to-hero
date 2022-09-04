import { IsNotEmpty, IsString } from 'class-validator'

export class CheckAnswerDto {
  @IsString()
  @IsNotEmpty()
  readonly questionId: string

  @IsString()
  @IsNotEmpty()
  readonly answerId: string
}
