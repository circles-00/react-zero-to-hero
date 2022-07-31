import { MigrationInterface, QueryRunner } from 'typeorm'

export class fixUserChallengesModel1659300808961 implements MigrationInterface {
  name = 'fixUserChallengesModel1659300808961'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-challenges" DROP COLUMN "lessonId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user-challenges" DROP CONSTRAINT "FK_d568d52cf10057b70ac8131557d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user-challenges" ALTER COLUMN "challengeId" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user-challenges" ADD CONSTRAINT "FK_d568d52cf10057b70ac8131557d" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-challenges" DROP CONSTRAINT "FK_d568d52cf10057b70ac8131557d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user-challenges" ALTER COLUMN "challengeId" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user-challenges" ADD CONSTRAINT "FK_d568d52cf10057b70ac8131557d" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user-challenges" ADD "lessonId" character varying NOT NULL`,
    )
  }
}
