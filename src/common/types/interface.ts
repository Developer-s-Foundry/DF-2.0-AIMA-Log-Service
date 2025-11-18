import { IsNumber, IsString } from "class-validator"


export class logData {
    @IsString()
    metric_name!: string

    @IsString()
    event_id: string
    
    time_stamp: Date

    @IsString()
    metric_type: string

    @IsString()
    source: string

    @IsString()
    version: string

    @IsString()
    labels: string | string[] | undefined

}

export interface QueryData {
    pageNumber: number
    pageLimit: number
    metric_type?: string
    metric_name?: string
    source?: string
}

export enum timeDifference {
    oneHourAgo = '1-hour-ago',
    twoHourAgo = '2-hours-ago',
    oneDayAgo = "1-day-ago",
    aMonthAgo = '1-month-ago',
    aYearAgo = '1-year-ago'
}

export interface metricPatialData {
    metricName: string,
    metricType: string,
    label?: string | Array<string>
}