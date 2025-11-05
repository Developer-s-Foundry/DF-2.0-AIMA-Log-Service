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
        @Query() value: number | undefined,
        @Query() result_type: string | undefined,
        @Query() metric_name: string | undefined,
        @Query() app_name: string | undefined,
        @Query() year: number,
        @Query() month: number | undefined,
        @Query() day: number | undefined,
        @Query() hour: number | undefined,
        @Query() minute: number | undefined,
        @Query() page: number,
        @Query() limit: number | undefined,
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