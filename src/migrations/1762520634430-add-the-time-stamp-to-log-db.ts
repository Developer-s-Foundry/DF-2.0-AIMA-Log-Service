import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTheTimeStampToLogDb1762520634430 implements MigrationInterface {
    name = 'AddTheTimeStampToLogDb1762520634430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "app_name" TO "app"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "app" TO "app_name"`);
    }

}
