import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewLogDb1762512628224 implements MigrationInterface {
    name = 'CreateNewLogDb1762512628224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "timestamp" TO "time_stamp"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" RENAME COLUMN "time_stamp" TO "timestamp"`);
    }

}
