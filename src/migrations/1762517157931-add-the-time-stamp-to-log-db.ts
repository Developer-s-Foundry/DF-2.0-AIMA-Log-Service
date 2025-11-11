import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTheTimeStampToLogDb1762517157931 implements MigrationInterface {
    name = 'AddTheTimeStampToLogDb1762517157931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "time_stamp"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "time_stamp" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "time_stamp"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "time_stamp" integer NOT NULL`);
    }

}
