import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewDb1761683303568 implements MigrationInterface {
    name = 'CreateNewDb1761683303568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "app" TO "app_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "app_name" TO "app"`);
    }

}
