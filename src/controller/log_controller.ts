import { timeDifference } from './../common/types/interface';
import { LogError } from "../common/types/error_types";
import { LogRepo } from "../repositories/log_repo";
import { Controller, Get, Query, Route, Tags } from "tsoa";
import { Log } from '../models/entities/log';


@Route('logs')
export class LogController extends Controller {
    private logRepository:  LogRepo;

    constructor() {
        super();
        this.logRepository =  new LogRepo();
    }
   
    @Get('/search-logs')
    @Tags('Logs')
    public async getLogs(
        @Query() time_difference?: timeDifference,
        @Query() page?: number,
        @Query() metric_name?: string,
        @Query() metric_type?: string,
        @Query() source?: string,
        @Query() limit?: number,
    ) : Promise<Log[]> {
        
        const pageLimit = limit || 10
        const pageNumber = page || 0;
        const timeDifferences = time_difference || timeDifference.oneHourAgo;
        const queryData = {
            metric_name, 
            metric_type,
            source,
            pageNumber, 
            pageLimit, 
        }

        return await this.logRepository.getLogs(queryData, timeDifferences)

    }
}