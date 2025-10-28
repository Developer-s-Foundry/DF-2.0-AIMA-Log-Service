import { DataSource } from "typeorm";
import { APP_CONFIGS } from ".";
import { parse } from "dotenv";
// import path from 'path'


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: APP_CONFIGS.DATABASE_HOST,
    port: parseInt(APP_CONFIGS.DATABASE_PORT),
    username: APP_CONFIGS.DATABASE_USERNAME,
    password: APP_CONFIGS.DATABASE_PASSWORD,
    database: APP_CONFIGS.DATABASE_NAME,
     entities: APP_CONFIGS.NODE_ENV === 'prod'
    ? ["../../models/entities/**/*{.ts,.js}"]
    : ["src/models/entities/**/*{.ts,.js}"],
    migrations: APP_CONFIGS.IS_PRODUCTION
    ? ["../../migrations/**/*{.ts,.js}"]
    : ["src/migrations/**/*{.ts,.js}"],
    // migrationsRun: true,
    // ssl: true,
})

export const dbInitialization = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")
    } catch (error) {
        console.error("Error during Data Source initialization", error)
    }     
}
