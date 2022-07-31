import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Challenge } from '../models/challenge.entity'
import { UserChallenges } from '../models/user-challenges'

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(UserChallenges)
    private readonly userChallengesRepository: Repository<UserChallenges>,
  ) {}

  async getAllChallenges({ userId }) {
    const userChallenges = await this.userChallengesRepository.find({
      relations: ['user', 'challenge'],
      where: {
        userId: userId,
      },
    })

    const mutatedUserChallenges = userChallenges.map(
      ({ isDone, challenge }) => ({
        isDone: isDone,
        ...challenge,
      }),
    )

    const challenges = await this.challengeRepository.find({})

    return challenges
      .filter(
        (challenge) =>
          !mutatedUserChallenges.some(
            (mutatedUserChallenge) => mutatedUserChallenge.id === challenge.id,
          ),
      )
      .concat(mutatedUserChallenges)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
  }
}
