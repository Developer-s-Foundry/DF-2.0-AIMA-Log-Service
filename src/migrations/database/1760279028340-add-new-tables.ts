import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTables1760279028340 implements MigrationInterface {
    name = 'AddNewTables1760279028340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`base_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clent-service\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`service_name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('active', 'inactive', 'deprecated') NOT NULL, \`language\` json NOT NULL, \`registered_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`host_machine\` varchar(255) NOT NULL, \`environment\` varchar(255) NOT NULL, \`region\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`incidence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`severity\` enum ('low', 'medium', 'high', 'critical') NOT NULL, \`ocurrence\` int NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`host\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`service_name\``);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`status\` enum ('debug', 'info', 'warn', 'error') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`service_source\` enum ('clientservice', 'microservice') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`service_source_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`deviceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`incidentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD CONSTRAINT \`FK_06312e591cbafe1de9e92b390d6\` FOREIGN KEY (\`deviceId\`) REFERENCES \`device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD CONSTRAINT \`FK_6cc8825111aa659286641784a81\` FOREIGN KEY (\`incidentId\`) REFERENCES \`incidence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_6cc8825111aa659286641784a81\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_06312e591cbafe1de9e92b390d6\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`incidentId\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`deviceId\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`service_source_id\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`service_source\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`update_at\``);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`service_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`host\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`incidence\``);
        await queryRunner.query(`DROP TABLE \`device\``);
        await queryRunner.query(`DROP TABLE \`clent-service\``);
        await queryRunner.query(`DROP TABLE \`base_model\``);
    }

}
