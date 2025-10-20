import { logData } from './../common/types/interface';
import { AppDataSource } from "../common/config/database";
import { Log } from "../models/entities/log";


export const logRepo = AppDataSource.getRepository(Log).extend({

    async createLog(logData: logData ): Promise<Log> {
        return this.save(logData)
    }
})