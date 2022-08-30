import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailService } from '../services/mail.service'
import { join } from 'path'
const {
  MAIL_HOST: host,
  MAIL_USER: user,
  MAIL_APP_PASSWORD: password,
} = process.env

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host,
        secure: true,
        auth: {
          user,
          pass: password,
        },
      },
      defaults: {
        from: '"no-reply" <noreply@react-zero-to-hero.com>',
      },
      template: {
        dir: join(__dirname, './mail/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
