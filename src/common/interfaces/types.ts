export interface IThirdPartyLoginPayload {
  firstName: string
  lastName: string
  email: string
  googleId?: string
  githubId?: string
  facebookId?: string
}

export type thirdPartyLoginMethodType = 'GOOGLE' | 'FACEBOOK' | 'GITHUB'

