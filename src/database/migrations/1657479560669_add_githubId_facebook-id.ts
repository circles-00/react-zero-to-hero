import { MigrationInterface, QueryRunner } from 'typeorm'

export class addGithubIdFacebookId1657479560669 implements MigrationInterface {
  name = 'addGithubIdFacebookId1657479560669'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "githubId" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD "facebookId" character varying`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "facebookId"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "githubId"`)
  }
}
