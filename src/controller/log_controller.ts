import { logRepo } from "../repositories/log_repo";
import { Controller, Get, Query, Route, Security, Tags } from "tsoa";


@Route('logs')
export class LogController extends Controller {
    private logRepository: typeof logRepo;

    constructor() {
        super();
        this.logRepository =  logRepo;
    }
   
    @Get('/search-logs')
    @Tags('Logs')
    public async getLogs(
        @Query() value: number,
        @Query() resource: string,
        @Query() service_type: string,
        @Query() metric_value: string,
        @Query() label_value: string,
        @Query() month: number,
        @Query() day: number,
        @Query() hour: number,
        @Query() minutes: number
    ) {
     // return logs to user based on query,
     // include pagination and limit

    }
}