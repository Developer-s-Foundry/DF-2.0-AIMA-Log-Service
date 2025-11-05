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
        @Query() result_type: string,
        @Query() metric_name: string,
        @Query() app_name: string,
        @Query() year: number,
        @Query() month: number,
        @Query() day: number,
        @Query() hour: number,
        @Query() minutes: number,

    ) {
        


        return ({
            message: 'successful'
        })

    }
}