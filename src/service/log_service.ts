import { logData } from './../common/types/interface';
import { logRepo } from "../repositories/log_repo";
import { instanceToPlain } from 'class-transformer';


export class LogService  {
    private logRepo: typeof logRepo

    constructor() {
        this.logRepo = logRepo
    }

    async createLog(logData: logData) {
        return instanceToPlain(this.logRepo.createLog(logData))
    }
}