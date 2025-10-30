import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewDatabase1761800590529 implements MigrationInterface {
    name = 'CreateNewDatabase1761800590529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_model" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6858b0bfee6d486b76e323b3e9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "incident" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "severity" "public"."incident_severity_enum" NOT NULL, "ocurrence" integer NOT NULL, CONSTRAINT "PK_5f90b28b0b8238d89ee8edcf96e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "metric_name" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "value" integer NOT NULL, "result_type" character varying NOT NULL, "app_name" character varying NOT NULL, "instance" character varying NOT NULL, "job" character varying NOT NULL, "incidentId" integer, "projectId" integer, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "project_id" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_6cc8825111aa659286641784a81" FOREIGN KEY ("incidentId") REFERENCES "incident"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_0c0ad31dd4033de83a2c47f2c82" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_0c0ad31dd4033de83a2c47f2c82"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_6cc8825111aa659286641784a81"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TABLE "incident"`);
        await queryRunner.query(`DROP TABLE "base_model"`);
    }

}
