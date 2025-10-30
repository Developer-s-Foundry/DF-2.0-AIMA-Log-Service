import { logData } from './../common/types/interface';
import { AppDataSource } from "../common/config/database";
import { Log } from "../models/entities/log";
import { Repository } from 'typeorm';
import { Project } from '../models/entities/project';





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
        const new_log = this.logRepository.create(logData);
        // save to database
        new_log.project = new_project;

        await this.logRepository.save(new_log);
        return new_log;
    }
}