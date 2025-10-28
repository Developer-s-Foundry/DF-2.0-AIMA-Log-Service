import { logData } from './../common/types/interface';
import { AppDataSource } from "../common/config/database";
import { Log } from "../models/entities/log";
import { Project } from '../models/entities/project';
import { Repository } from 'typeorm';





export class logRepo {

    private projectRepo: Repository<Project>
    private logRepository:  Repository<Log>
    
    constructor() {
        this.projectRepo = AppDataSource.getRepository(Project);
        this.logRepository = AppDataSource.getRepository(Log);
    }
    
    async createLog(logData: logData ): Promise<Log> {
        // create project with project_id
        const new_project = this.projectRepo.create(logData);
        // create logs, link with project
        const new_log = this.logRepository.create(logData);
        // save to database
        new_log.project = new_project;
        this.logRepository.save(new_log);
        return new_log;
    }
}