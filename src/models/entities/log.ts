import { LogLevel, serviceSource } from '../../common/types/variable_types';
import { Entity, Column, ManyToOne,  } from "typeorm";
import { BaseModel } from './base_model';
import { Incident } from './incident';




@Entity()
export class Log extends BaseModel{

    @Column({nullable: false})
    metric_name!: string

    @Column({nullable: false})
    app_id!: string

    @Column()
    timestamp!: Date

    @Column({ type: 'jsonb', default: () => "'{}'" })
    labels!: Record<string, any>

    @Column({nullable: false})
    value: number

    // @Column({type: 'enum', 
    //     enum: LogLevel })
    // status!: LogLevel

    // @Column('text')
    // message!: string
    
    // @Column('json')
    // context!: Record<string,  any>

    // @Column({type: 'enum', enum: serviceSource })
    // service_source!: serviceSource

    // @Column()
    // service_source_id!: string

    @ManyToOne(() => Incident, (incident) => incident.log)
    incident!: Incident
}