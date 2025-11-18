import { Entity, Column, ManyToOne,  } from "typeorm";
import { BaseModel } from './base_model';
import { Incident } from './incident';
import { Event } from "./event";



@Entity()
export class Log extends BaseModel{

    @Column()
    metric_name!:  string

    @Column({type: 'timestamptz'})
    time_stamp!: Date

    @Column({ type: 'jsonb', nullable: true}) 
    labels!: any 

    @Column({nullable: false})
    metric_type!: string

    @Column()
    version!: string

    @Column()
    source!: string

    // @Column()
    // app!: string

    // @Column()
    // instance!: string

    // @Column()
    // job!: string

    @ManyToOne(() => Incident, (incident) => incident.logs)
    incident!: Incident

    @ManyToOne(() => Event, (event) => event.logs)
    event!: Event
}