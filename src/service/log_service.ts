import { logData } from './../common/types/interface';
import { LogRepo } from "../repositories/log_repo";
import { instanceToPlain } from 'class-transformer';


export class LogService  {
    private logRepository: LogRepo 

    constructor() {
        this.logRepository = new LogRepo()
    }

    async createLog(logData: logData) {
        return instanceToPlain(this.logRepository.createLog(logData))
        // return this.logRepository.createLog(logData)
    }

    
}