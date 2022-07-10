import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { thirdPartyLoginMethodType } from '../../common/interfaces/types'

export class ThirdPartyLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string

  // Find a better solution for this
  @IsIn(['GOOGLE', 'GITHUB', 'FACEBOOK'])
  @IsNotEmpty()
  readonly method: thirdPartyLoginMethodType
}
