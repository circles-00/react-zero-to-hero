import { Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } =
  process.env

@Injectable()
export class GoogleAuthService {
  private readonly googleClient
  constructor() {
    this.googleClient = new OAuth2Client({
      clientId,
      clientSecret,
      // This line is very important, notice 'postmessage'
      redirectUri: 'postmessage',
    })
  }

  async getPayloadFromToken(googleAuthCode: string) {
    const {
      tokens: { id_token: googleToken },
    } = await this.googleClient.getToken(googleAuthCode)

    const ticket = await this.googleClient.verifyIdToken({
      idToken: googleToken,
      audience: clientId,
    })

    const payload = ticket.getPayload()

    const { name, email, sub: googleId } = payload
    const [firstName, lastName] = name.split(' ')

    return {
      firstName,
      lastName: lastName || '',
      email: email,
      googleId,
    }
  }
}
