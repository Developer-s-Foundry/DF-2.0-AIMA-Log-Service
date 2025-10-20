import { IsObject } from "class-validator"


export class logData {
    
    @IsObject()
    metric: Record<string, any>;

    app_id: string
        
    timestamp: string
    
    @IsObject()
    labels: Record<string, any>
    
    value: number
    
    service_id: string

    resource: string
    
    type: string
    
}