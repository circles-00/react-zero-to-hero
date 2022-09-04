import { MigrationInterface, QueryRunner } from 'typeorm'

export class addCertificationProgress1662318349586
  implements MigrationInterface
{
  name = 'addCertificationProgress1662318349586'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user-certification"
        ADD "progress" json`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user-certification"
        DROP COLUMN "progress"`)
  }
}
