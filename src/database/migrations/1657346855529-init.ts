import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1657346855529 implements MigrationInterface {
  name = 'init1657346855529'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table lessons
       (
           id                 uuid primary key         not null default uuid_generate_v4(),
           "createdAt"        timestamp with time zone not null default now(),
           "lastUpdated"      timestamp with time zone not null default now(),
           title              character varying        not null,
           "shortDescription" character varying        not null,
           description        character varying        not null,
           difficulty         integer                  not null
       );

      create table users
      (
          id            uuid primary key         not null default uuid_generate_v4(),
          "createdAt"   timestamp with time zone not null default now(),
          "lastUpdated" timestamp with time zone not null default now(),
          "firstName"   character varying        not null,
          "lastName"    character varying        not null,
          email         character varying        not null,
          password      character varying        not null,
          "googleId"    character varying,
          "githubId"    character varying,
          "facebookId"  character varying
      );
      create unique index "UQ_97672ac88f789774dd47f7c8be3" on users using btree (email);

      create table "user-lessons"
      (
          id            uuid primary key         not null default uuid_generate_v4(),
          "createdAt"   timestamp with time zone not null default now(),
          "lastUpdated" timestamp with time zone not null default now(),
          "userId"      uuid                     not null,
          "lessonId"    uuid                     not null,
          "isDone"      boolean                  not null,
          foreign key ("lessonId") references lessons (id)
              match simple on update no action on delete no action,
          foreign key ("userId") references users (id)
              match simple on update no action on delete no action
      );

      `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE lessons;
        DROP TABLE "user-lessons";
        DROP TABLE users;
    `)
  }
}
