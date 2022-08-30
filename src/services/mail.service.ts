import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { join } from 'path'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPasswordConfirmation(
    accessToken: string,
    email: string,
    appUrl: string,
  ) {
    const confirmationUrl = `http://${appUrl}/reset-password/${accessToken}`

    await this.mailerService.sendMail({
      to: email,
      subject: '[React Zero to Hero] Reset your password!',
      template: join(
        __dirname,
        '../mail/templates/reset-password.template.hbs',
      ),
      context: {
        RESET_PASSWORD_LINK: confirmationUrl,
        HOST: appUrl,
      },
    })
  }
}
