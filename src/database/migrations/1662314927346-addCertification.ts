import { MigrationInterface, QueryRunner } from 'typeorm'

export class addCertification1662314927346 implements MigrationInterface {
  name = 'addCertification1662314927346'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "certification"
                             (
                                 "id"          uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "createdAt"   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "lastUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "questions"   json                     NOT NULL,
                                 CONSTRAINT "PK_a7364bd3e4a407f67d8165b820c" PRIMARY KEY ("id")
                             )`)
    await queryRunner.query(`CREATE TABLE "user-certification"
                             (
                                 "id"              uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "createdAt"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "lastUpdated"     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "userId"          uuid                     NOT NULL,
                                 "certificationId" uuid                     NOT NULL,
                                 "isDone"          boolean                  NOT NULL,
                                 "dueDate"         TIMESTAMP WITH TIME ZONE NOT NULL,
                                 "certificate"     text                     NOT NULL,
                                 CONSTRAINT "PK_22a48fd4dad3967fdca1ac6b9b9" PRIMARY KEY ("id")
                             )`)
    await queryRunner.query(`ALTER TABLE "user-certification"
        ADD CONSTRAINT "FK_baf41d6deeabc472c3b9eab48b3" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "user-certification"
        ADD CONSTRAINT "FK_1e588edd0bbde75cef123ba20bd" FOREIGN KEY ("certificationId") REFERENCES "certification" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user-certification"
        DROP CONSTRAINT "FK_1e588edd0bbde75cef123ba20bd"`)
    await queryRunner.query(`ALTER TABLE "user-certification"
        DROP CONSTRAINT "FK_baf41d6deeabc472c3b9eab48b3"`)
    await queryRunner.query(`DROP TABLE "user-certification"`)
    await queryRunner.query(`DROP TABLE "certification"`)
  }
}
