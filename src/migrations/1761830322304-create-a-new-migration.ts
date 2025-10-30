import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateANewMigration1761830322304 implements MigrationInterface {
    name = 'CreateANewMigration1761830322304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "app_project_id" TO "project_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "project_id" TO "app_project_id"`);
    }

}
