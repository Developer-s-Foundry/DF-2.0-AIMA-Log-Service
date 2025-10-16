import { DataSource } from "typeorm";
import { APP_CONFIGS } from ".";
import path from 'path'


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: APP_CONFIGS.DATABASE_HOST,
    port: parseInt(APP_CONFIGS.DATABASE_PORT),
    username: APP_CONFIGS.DATABASE_USERNAME,
    password: APP_CONFIGS.DATABASE_PASSWORD,
    database: APP_CONFIGS.DATABASE_NAME,
    entities: [path.join(__dirname, '../../models/entities/*.{js,ts}')],
    migrations: [path.join(__dirname, '../../migrations/database/*.ts')],
    ssl: true
})

export const dbInitialization = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")
    } catch (error) {
        console.error("Error during Data Source initialization", error)
    }     
}
