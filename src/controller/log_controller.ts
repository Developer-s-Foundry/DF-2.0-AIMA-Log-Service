import { LogError } from "../common/types/error_types";
import { LogRepo } from "../repositories/log_repo";
import { Controller, Get, Query, Route, Tags } from "tsoa";


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
        @Query() value: number,
        @Query() result_type: string,
        @Query() metric_name: string,
        @Query() app_name: string,
        @Query() year: number,
        @Query() month: number,
        @Query() day: number,
        @Query() hour: number,
        @Query() minute: number,
        @Query() page: number,
        @Query() limit: number
    ) {
        if (!year && !page) {
            throw new LogError('year and page number not included', 400)
        }
        const pageLimit = limit || 10
        const time_stamp = 0;
        const queryData = {
            value, result_type, metric_name, 
            app_name, page, pageLimit, time_stamp
        }

        const timeData = {
            year, month, day, hour, minute
        }

        return await this.logRepository.getLogs(queryData, timeData)

    }
}