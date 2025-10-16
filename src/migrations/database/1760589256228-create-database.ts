import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1760589256228 implements MigrationInterface {
    name = 'CreateDatabase1760589256228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_model" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6858b0bfee6d486b76e323b3e9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."incidence_severity_enum" AS ENUM('low', 'medium', 'high', 'critical')`);
        await queryRunner.query(`CREATE TABLE "incidence" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "severity" "public"."incidence_severity_enum" NOT NULL, "ocurrence" integer NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_4aaac6056c701d7a0bcf083dea9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "metric_name" character varying NOT NULL, "app_id" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "labels" jsonb NOT NULL DEFAULT '{}', "value" integer NOT NULL, "incidentId" integer, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_6cc8825111aa659286641784a81" FOREIGN KEY ("incidentId") REFERENCES "incidence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_6cc8825111aa659286641784a81"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TABLE "incidence"`);
        await queryRunner.query(`DROP TYPE "public"."incidence_severity_enum"`);
        await queryRunner.query(`DROP TABLE "base_model"`);
    }

}
