export interface IThirdPartyLoginPayload {
  firstName: string
  lastName: string
  email: string
  externalId: string
}

export type thirdPartyLoginMethodType = 'GOOGLE' | 'FACEBOOK' | 'GITHUB'

