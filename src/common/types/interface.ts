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