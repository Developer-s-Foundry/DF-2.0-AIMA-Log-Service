import { logData, QueryData, TimeStampData } from './../common/types/interface';
import { AppDataSource } from "../common/config/database";
import { Log } from "../models/entities/log";
import { Repository } from 'typeorm';
import { Project } from '../models/entities/project';
import { buildTimestamp, validateTimeQuery } from '../common/utils/helper_func';





export class LogRepo {

    private projectRepo: Repository<Project>
    private logRepository:  Repository<Log>
    
    constructor() {
        this.projectRepo = AppDataSource.getRepository(Project);
        this.logRepository = AppDataSource.getRepository(Log);
    }
    
    async createLog(logData: logData ): Promise<Log> {
        // console.log(logData)
        if (!logData) {
            throw new Error('log data missing')
        }
        // create project with project_id
        const new_project = this.projectRepo.create({project_id: logData.project_id});
        await this.projectRepo.save(new_project)
        // create logs, link with project
        // construct new log data
        const newTimestamp = new Date(logData.time_stamp)
        const new_log = this.logRepository.create({...logData, time_stamp: newTimestamp });
        // save to database
        new_log.project = new_project;

        await this.logRepository.save(new_log);
        return new_log;
    }

    async getLogs(data: QueryData, timeData: TimeStampData) {
        // validate time stamp, throw error if not passed in sequence
        validateTimeQuery(timeData);
        // create timestam from query
        const timeStamp = buildTimestamp(timeData);
        const findOptions = {
            where: {
                value: data.value,
                result_type: data.result_type,
                metric_name: data.metric_name, 
                app_name: data.app_name,
                time_stamp: timeStamp
            },
            // Add pagination and limit if needed
            skip: data.page,
            take: data.pageLimit,
        };

        return await this.logRepository.find(findOptions);
    }
}