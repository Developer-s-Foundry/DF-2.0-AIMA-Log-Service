import { LogLevel, serviceSource } from '../../common/types/variable_types';
import { Entity, Column, ManyToOne,  } from "typeorm";
import { BaseModel } from './base_model';
import { Incident } from './incident';
import { Exclude } from 'class-transformer';




@Entity()
export class Log extends BaseModel{

    @Column({ type: 'jsonb', default: () => "'{}'" })
    metrics!:  Record<string, any>

    @Exclude()
    @Column({nullable: false})
    app_id!: string

    @Column()
    timestamp!: Date

    @Column({ type: 'jsonb', default: () => "'{}'" })
    labels!: Record<string, any>

    @Column({nullable: false})
    value!: number

    @Column({nullable: false})
    resource!: string

    @Column()
    service_type!: string

    @ManyToOne(() => Incident, (incident) => incident.log)
    incident!: Incident
}