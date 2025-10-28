import { logData } from './../common/types/interface';
import { logRepo } from "../repositories/log_repo";
import { instanceToPlain } from 'class-transformer';


export class LogService  {
    private logRepository: logRepo 

    constructor() {
        this.logRepository = new logRepo()
    }

    async createLog(logData: logData) {
        return instanceToPlain(this.logRepository.createLog(logData))
    }
}