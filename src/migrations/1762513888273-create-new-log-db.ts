import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewLogDb1762513888273 implements MigrationInterface {
    name = 'CreateNewLogDb1762513888273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "time_stamp"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "time_stamp" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "time_stamp"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "time_stamp" TIMESTAMP NOT NULL`);
    }

}
