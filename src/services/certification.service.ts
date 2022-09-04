import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserCertification } from '../models/user-certification.entity'
import { Certification } from '../models/certification.entity'
import { CheckAnswerDto } from '../dto/check-answer.dto'
import { User } from '../models/user.entity'
import { ICertificationProgress } from '../common/interfaces/types'
const Jimp = require('jimp')
import { join } from 'path'

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(UserCertification)
    private readonly userCertificationRepository: Repository<UserCertification>,
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
  ) {}

  async getCertificationData(user: User) {
    const [certificationData]: any = await this.certificationRepository.find()
    const userCertificationData =
      await this.userCertificationRepository.findOne({
        where: {
          certificationId: certificationData.id,
          userId: user.id,
        },
      })

    if (userCertificationData !== null) {
      certificationData.dueDate = userCertificationData.dueDate
      certificationData.isDone = userCertificationData.isDone
      certificationData.certificate = userCertificationData.certificate
      certificationData.progress = userCertificationData.progress
    }

    return certificationData
  }

  async checkAnswer(checkAnswerDto: CheckAnswerDto, user: User) {
    const { questionId, answerId } = checkAnswerDto
    const [certificationData] = await this.certificationRepository.find()
    let userCertificationData = await this.userCertificationRepository.findOne({
      where: {
        userId: user.id,
        certificationId: certificationData.id,
      },
    })
    const question = certificationData.questions[Number.parseInt(questionId)]

    await this.evaluateProgress(
      user.id,
      certificationData,
      userCertificationData,
      question.rightAnswer === answerId,
    )

    userCertificationData = await this.userCertificationRepository.findOne({
      where: {
        userId: user.id,
        certificationId: certificationData.id,
      },
    })

    // This is the end of certification
    // If user has > 50% then generate a certificate
    // If not, then return the results
    if (this.isCertificationOver(userCertificationData)) {
      await this.userCertificationRepository.update(
        { userId: user.id, certificationId: certificationData.id },
        {
          isDone: true,
        },
      )
      // Generate certificate for user
      if (this.isCertificationSuccessful(userCertificationData)) {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK)
        const blankCert = await Jimp.read(
          join(__dirname, '../certificates/blank_certificate.png'),
        )
        await blankCert.print(
          font,
          50,
          160,
          `${user.firstName} ${user.lastName}`,
        )
        const certBase64 = await blankCert.getBase64Async('image/png')

        await this.userCertificationRepository.update(
          { userId: user.id, certificationId: certificationData.id },
          {
            certificate: certBase64,
          },
        )
      }
    }

    return {
      isAnswerCorrect: question.rightAnswer === answerId,
    }
  }

  isCertificationOver(userCertificationData: UserCertification) {
    return (
      userCertificationData.progress.wrongAnswers +
        userCertificationData.progress.rightAnswers >=
      userCertificationData.progress.totalAnswers
    )
  }

  isCertificationSuccessful(userCertificationData: UserCertification) {
    return (
      userCertificationData.progress.rightAnswers >=
      userCertificationData.progress.totalAnswers / 2
    )
  }

  async evaluateProgress(
    userId: string,
    certificationData,
    userCertificationData,
    isAnswerRight: boolean,
  ) {
    const progress: ICertificationProgress = {
      ...userCertificationData.progress,
    }

    isAnswerRight
      ? (progress.rightAnswers =
          userCertificationData.progress.rightAnswers + 1)
      : (progress.wrongAnswers =
          userCertificationData.progress.wrongAnswers + 1)

    return await this.userCertificationRepository.update(
      { certificationId: certificationData.id, userId },
      { progress },
    )
  }

  async beginCertification(user: User) {
    const [certificationData] = await this.certificationRepository.find()
    // Due date is 15min later
    const dueDate = new Date(new Date().getTime() + 15 * 60000)

    const userCertificationExists =
      await this.userCertificationRepository.findOne({
        where: {
          userId: user.id,
          certificationId: certificationData.id,
        },
      })

    if (userCertificationExists) return

    return await this.userCertificationRepository.save({
      userId: user.id,
      certificationId: certificationData.id,
      isDone: false,
      dueDate,
      certificate: '',
      progress: {
        rightAnswers: 0,
        wrongAnswers: 0,
        totalAnswers: certificationData.questions.length,
      },
    })
  }
}
