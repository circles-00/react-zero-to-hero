import { Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

@Injectable()
export class GoogleAuthService {
  constructor() {
  }

  async getPayloadFromToken(googleAuthCode: string) {
    const googleClient = new OAuth2Client({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // This line is very important, notice 'postmessage'
      redirectUri: 'postmessage',
    });

    const { tokens: {id_token: googleToken} } = await googleClient.getToken(googleAuthCode)

    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    const { name, email, sub: externalId } = payload
    const [firstName, lastName] = name.split(' ')

    return {
      firstName,
      lastName,
      email: email,
      externalId
    }
  }

}
