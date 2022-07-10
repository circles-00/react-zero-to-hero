import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm'
import { User } from '../../models/user.entity'
import { AuthProvider } from '../providers/auth.provider'
import * as crypto from 'crypto'

@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User
  }

  async beforeInsert({ entity }: InsertEvent<User>): Promise<void> {
    if (entity.password) {
      entity.password = await AuthProvider.generateHash(entity.password)
    }

    if (entity.email) {
      entity.email = entity.email.toLowerCase()
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<User>): Promise<void> {
    if (entity.password) {
      const password = await AuthProvider.generateHash(entity.password)

      if (
        !crypto.timingSafeEqual(
          Buffer.from(password),
          Buffer.from(databaseEntity?.password),
        )
      ) {
        entity.password = password
      }
    }
  }
}
