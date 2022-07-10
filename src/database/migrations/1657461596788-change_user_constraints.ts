import { MigrationInterface, QueryRunner } from 'typeorm'

export class changeUserConstraints1657461596788 implements MigrationInterface {
  name = 'changeUserConstraints1657461596788'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4" UNIQUE ("firstName")`,
    )
  }
}
