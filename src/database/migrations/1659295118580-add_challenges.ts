import { MigrationInterface, QueryRunner } from 'typeorm'

export class addChallenges1659295118580 implements MigrationInterface {
  name = 'addChallenges1659295118580'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user-challenges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "lessonId" character varying NOT NULL, "isDone" boolean NOT NULL, "challengeId" uuid, CONSTRAINT "PK_8bac167cbf189113ec2523e89c0" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "challenges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "shortDescription" character varying NOT NULL, "description" character varying NOT NULL, "difficulty" integer NOT NULL, "answers" json NOT NULL, "rightAnswer" character varying NOT NULL, CONSTRAINT "PK_1e664e93171e20fe4d6125466af" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "user-challenges" ADD CONSTRAINT "FK_316c189350b6dfc0564a27e37be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "user-challenges" DROP CONSTRAINT "FK_316c189350b6dfc0564a27e37be"`,
    )
    await queryRunner.query(`DROP TABLE "challenges"`)
    await queryRunner.query(`DROP TABLE "user-challenges"`)
  }
}
