import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Certification } from '../models/certification.entity'
import { UserCertification } from '../models/user-certification.entity'
import { CertificationService } from '../services/certification.service'
import { CertificationController } from '../controllers/certification.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserCertification, Certification])],
  controllers: [CertificationController],
  providers: [CertificationService],
  exports: [CertificationService],
})
export class CertificationModule {}
