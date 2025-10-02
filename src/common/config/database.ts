import { DataSource } from "typeorm";
import { APP_CONFIGS } from ".";



const AppDataSource = new DataSource({
    type: 'mysql',
    host: APP_CONFIGS.DATABASE_HOST,
    port: parseInt(APP_CONFIGS.DATABASE_PORT),
    username: APP_CONFIGS.DATABASE_USERNAME,
    password: APP_CONFIGS.DATABASE_PASSWORD,
    database: APP_CONFIGS.DATABASE_NAME,
})

export const dbInitialization = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")
    } catch (error) {
        console.error("Error during Data Source initialization", error)
    }     
}
