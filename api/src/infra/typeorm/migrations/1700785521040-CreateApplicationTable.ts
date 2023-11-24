import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateApplicationTable1700785521040 implements MigrationInterface {
  name = 'CreateApplicationTable1700785521040'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "login_url" character varying NOT NULL, "name" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_9e7594d5b474d9cbebba15c1ae" UNIQUE ("user_id"), CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "FK_9e7594d5b474d9cbebba15c1ae7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "FK_9e7594d5b474d9cbebba15c1ae7"`,
    )
    await queryRunner.query(`DROP TABLE "applications"`)
  }
}
