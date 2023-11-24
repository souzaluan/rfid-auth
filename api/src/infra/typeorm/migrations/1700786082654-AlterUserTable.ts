import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterUserTable1700786082654 implements MigrationInterface {
  name = 'AlterUserTable1700786082654'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "tag" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tag"`)
  }
}
