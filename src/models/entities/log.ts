import { LogLevel, serviceSource } from '../../common/types/variable_types';
import { Entity, Column, ManyToOne,  } from "typeorm";
import { BaseModel } from './base_model';
import { Incident } from './incident';
import { Exclude } from 'class-transformer';




@Entity()
export class Log extends BaseModel{

    @Column({ type: 'jsonb', default: () => "'{}'" })
    metric!:  Record<string, any>

    @Exclude()
    @Column({nullable: false})
    app_id!: string

    @Column()
    timestamp!: Date

    @Column({ type: 'jsonb', default: () => "'{}'" })
    labels!: Record<string, any>

    @Column({nullable: false})
    value!: number

    @Exclude()
    @Column()
    service_id!: string

    @Column({nullable: false})
    resource!: string

    @Column()
    type!: string



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