import { logData, QueryData, timeDifference} from './../common/types/interface';
import { AppDataSource } from "../common/config/database";
import { Log } from "../models/entities/log";
import { Repository } from 'typeorm';
import { Event } from '../models/entities/event';
import { buildTimestamp} from '../common/utils/helper_func';
import { timeStampDto } from '../common/dto/log_dtos';





export class LogRepo {

    private eventRepo: Repository<Event>
    private logRepository:  Repository<Log>
    
    constructor() {
        this.eventRepo = AppDataSource.getRepository(Event);
        this.logRepository = AppDataSource.getRepository(Log);
    }
    
    async createLog(logData: logData ): Promise<Log> {
        // console.log(logData)
        if (!logData) {
            throw new Error('log data missing')
        }
        // create project with event_id
        const new_event = this.eventRepo.create({event_id: logData.event_id});
        await this.eventRepo.save(new_event)
        // create logs, link with project
        // construct new log data
        const new_log = this.logRepository.create({...logData});
        // save to database
        new_log.event = new_event;

        await this.logRepository.save(new_log);
        return new_log;
    }

    async getLogs(data: QueryData, timeData: timeDifference): Promise<Log[]> {
        const {source, metric_type,
                metric_name, pageLimit, pageNumber} = data;
        
        let startDate;
        const endDate = new Date();

        switch (timeData) {
            case timeDifference.oneHourAgo:
                startDate = new Date(endDate.getTime() - 60 * 60 * 1000 * 1);
                
                break;

             case timeDifference.twoHourAgo:
                startDate = new Date(endDate.getTime() - 60 * 60 * 1000 * 2);
            
                break;

            case timeDifference.oneDayAgo:
                startDate = new Date(endDate.getDay());
            
                break;

            case timeDifference.aMonthAgo:
                startDate = new Date(endDate.getFullYear(), 
                    endDate.getMonth() > 0 ?  endDate.getMonth() - 1 : 0,  endDate.getDay());
                break;

            case timeDifference.aYearAgo:
                startDate = new Date(endDate.getFullYear() - 1,  0,  1);
                
                break;
        
            default:
                startDate = new Date(endDate.getTime() - 60 * 60 * 1000 * 1);
                break;
        }

        const queryBuild = this.logRepository.createQueryBuilder().where(`
            time_stamp BETWEEN :startDate and :endDate`, {startDate, endDate}
            )

        if (source) {
            queryBuild.andWhere(`source = :source`, {source})
        }
        if (metric_name) {
            queryBuild.andWhere(`metric_name = :metric_name`, {metric_name})
        }

        if (metric_type) {
            queryBuild.andWhere(`metric_type = :metric_type`, {metric_type})
        }
    
        const logs = await queryBuild.skip(pageNumber)
            .take(pageLimit)
            .getMany();

        console.log(logs);

        return logs;
    }
}