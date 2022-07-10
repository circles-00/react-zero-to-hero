import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class FacebookAuthService {
  async getUserInfo(accessToken: string) {
    const { data } = await axios.post('https://graph.facebook.com/me', {
      fields: 'id, email, first_name, last_name',
      access_token: accessToken,
    })

    return data
  }

  async getPayloadFromToken(accessToken: string) {
    const {
      id: facebookId,
      first_name,
      last_name,
      email,
    } = await this.getUserInfo(accessToken)

    return {
      firstName: first_name,
      lastName: last_name,
      email,
      facebookId,
    }
  }
}
