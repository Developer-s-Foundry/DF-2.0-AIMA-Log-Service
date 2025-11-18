import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTheLogTable1763462239608 implements MigrationInterface {
    name = 'CreateTheLogTable1763462239608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base_model" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "base_model" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "base_model" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "base_model" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "incident" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "incident" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "incident" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "incident" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "time_stamp"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "time_stamp" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "time_stamp"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "time_stamp" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "incident" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "incident" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "incident" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "incident" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "base_model" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "base_model" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "base_model" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "base_model" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
