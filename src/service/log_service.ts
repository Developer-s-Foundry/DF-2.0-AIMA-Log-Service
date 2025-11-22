import { MetricData } from './../common/types/interface';
import { MetricRepo } from "../repositories/metrics_repo";
import { instanceToPlain } from 'class-transformer';


export class LogService  {
    private logRepository: MetricRepo 

    constructor() {
        this.logRepository = new MetricRepo()
    }

    async createMetrics(MetricData: MetricData) {
        return instanceToPlain(this.logRepository.createLog(MetricData))
        // return this.logRepository.createLog(MetricData)
    }

    
}