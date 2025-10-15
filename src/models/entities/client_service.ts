import { Entity, Column} from "typeorm";

import { ServiceStatus } from "../../common/types/variable_types";
import { BaseModel } from "./base_model";

@Entity('clent-service')
export class ClientService extends BaseModel {
    @Column()
    service_name!: string

    @Column()
    description!: string

    @Column({type: 'enum', 
        enum: ServiceStatus })
    status!: ServiceStatus
    
    @Column('json')
    language!: string

    @Column()
     registered_at!: Date
}