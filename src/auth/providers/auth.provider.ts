import * as bcrypt from 'bcrypt'

export class AuthProvider {
  static async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
}
