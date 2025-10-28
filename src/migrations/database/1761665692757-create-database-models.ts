import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabaseModels1761665692757 implements MigrationInterface {
    name = 'CreateDatabaseModels1761665692757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "basemodel" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c827d4adadccfc169df9679afe9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "metric_name" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "value" integer NOT NULL, "result_type" character varying NOT NULL, "app" character varying NOT NULL, "instance" character varying NOT NULL, "job" character varying NOT NULL, "incidentId" integer, "projectId" integer, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "project_id" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "incidence" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_5ef885fe2e27cb515f3445052b9" FOREIGN KEY ("incidentId") REFERENCES "incidence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_19bc2d0c965baaff49c69cec89c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_19bc2d0c965baaff49c69cec89c"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_5ef885fe2e27cb515f3445052b9"`);
        await queryRunner.query(`ALTER TABLE "incidence" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TABLE "basemodel"`);
    }

}
