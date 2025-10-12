import { LogLevel, serviceSource } from './../../common/config/types';
import { Entity, Column, ManyToOne,  } from "typeorm";
import { BaseModel } from './base_model';
import { Device } from './device';
import { Incident } from './incident';




@Entity()
export class Log extends BaseModel{

    @Column()
    timestamp!: Date

    @Column({type: 'enum', 
        enum: LogLevel })
    status!: LogLevel

    @Column('text')
    message!: string
    
    @Column('json')
    context!: Record<string,  any>

    @Column({type: 'enum', enum: serviceSource })
    service_source!: serviceSource

    @Column()
    service_source_id!: string

    @ManyToOne(() => Device, (device) => device.log)
    device!: Device

    @ManyToOne(() => Incident, (incident) => incident.log)
    incident!: Incident
}