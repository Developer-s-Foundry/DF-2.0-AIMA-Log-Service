import { timeDifference } from './../common/types/interface';
import { LogError } from "../common/types/error_types";
import { MetricRepo } from "../repositories/metrics_repo";
import { Controller, Get, Query, Route, Tags } from "tsoa";
import { Metric } from '../models/entities/metric';


@Route('logs')
export class LogController extends Controller {
    private MetricRepository:  MetricRepo;

    constructor() {
        super();
        this.MetricRepository =  new MetricRepo();
    }
   
    @Get('/search-metrics')
    @Tags('Logs')
    public async getMetrics(
        @Query() time_difference?: timeDifference,
        @Query() page?: number,
        @Query() metric_name?: string,
        @Query() limit?: number,
    ) : Promise<Metric[]> {
        
        const pageLimit = limit || 10
        const pageNumber = page || 0;
        const timeDifferences = time_difference || timeDifference.oneHourAgo;
        const queryData = {
            metric_name, 
            pageNumber, 
            pageLimit, 
        }

        return await this.MetricRepository.getMetrics(queryData, timeDifferences)

    }
}