import { IsNotEmpty, IsString } from 'class-validator'

export class LessonDoneDto {
  @IsString()
  @IsNotEmpty()
  readonly lessonId: string
}
