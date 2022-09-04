export interface IThirdPartyLoginPayload {
  firstName: string
  lastName: string
  email: string
  googleId?: string
  githubId?: string
  facebookId?: string
}

export type thirdPartyLoginMethodType = 'GOOGLE' | 'FACEBOOK' | 'GITHUB'

export interface IQuestion {
  question: string
  answers: Array<string>
  rightAnswer: string
}

export interface ICertificationProgress {
  rightAnswers: number
  wrongAnswers: number
  totalAnswers: number
}
