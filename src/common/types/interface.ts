import { IsNumber, IsString } from "class-validator"


export class logData {
    @IsString()
    metric_name!: string

     @IsString()
    project_id: string

    
    time_stamp: Date

    @IsNumber()
    value: number

    @IsString()
    result_type: string

    @IsString()
    app: string

    @IsString()
    instance: string

    @IsString()
    job: string

}

export interface QueryData {
    page: number
    limit: number
    value: number | undefined 
    result_type: string | undefined 
    metric_name: string | undefined 
    app_name: string | undefined 
    time_stamp: number | undefined 
}

export interface TimeStampData {
    year: number
    month: number | undefined
    day: number | undefined
    hour: number | undefined
    minute: number | undefined
}