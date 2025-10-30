import { LogRepo } from "../repositories/log_repo";
import { Controller, Get, Query, Route, Tags } from "tsoa";


@Route('logs')
export class LogController extends Controller {
    private logRepository: typeof LogRepo;

    constructor() {
        super();
        this.logRepository =  LogRepo;
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