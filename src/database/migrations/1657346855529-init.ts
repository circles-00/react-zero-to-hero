import { MigrationInterface, QueryRunner } from "typeorm";

export class init1657346855529 implements MigrationInterface {
    name = 'init1657346855529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4" UNIQUE ("firstName")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "googleId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "googleId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4"`);
    }

}
