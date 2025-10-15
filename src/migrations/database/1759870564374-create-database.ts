import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1759870564374 implements MigrationInterface {
    name = 'CreateDatabase1759870564374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`timestamp\` datetime NOT NULL, \`service_name\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`context\` json NOT NULL, \`host\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`log\``);
    }

}
