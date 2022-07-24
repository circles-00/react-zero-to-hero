import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserLessons } from '../models/user-lessons.entity'
import { Lesson } from '../models/lessons.entity'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(UserLessons)
    private readonly userLessonRepository: Repository<UserLessons>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async findAll({ userId }) {
    const userLessons = await this.userLessonRepository.find({
      relations: ['user', 'lesson'],
      where: {
        userId: userId,
      },
    })

    const mutatedUserLessons = userLessons.map(({ isDone, lesson }) => ({
      isDone: isDone,
      ...lesson,
    }))

    const lessons = await this.lessonRepository.find({})

    return lessons
      .filter(
        (lesson) =>
          !mutatedUserLessons.some(
            (mutatedUserLesson) => mutatedUserLesson.id === lesson.id,
          ),
      )
      .concat(mutatedUserLessons)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
  }

  async markLessonAsDone(lessonId: string, userId: string) {
    // Should probably use the current state that is in the database, so we avoid manual sending of lessonId from frontend,
    // As someone could hardcode us the lessonId in a request,
    // But as this application is not really that complex, this should work just fine
    return await this.userLessonRepository.save({
      lessonId,
      userId,
      isDone: true,
    })
  }
}
