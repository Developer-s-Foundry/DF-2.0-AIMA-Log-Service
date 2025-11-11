import { Entity, Column, ManyToOne,  } from "typeorm";
import { BaseModel } from './base_model';
import { Incident } from './incident';
import { Project } from "./project";



@Entity()
export class Log extends BaseModel{

    @Column()
    metric_name!:  string

    @Column({type: 'timestamp'})
    time_stamp!: Date

    // @Column({ type: 'jsonb', default: () => "'{}'" })  month: number
    // labels!: Record<string, any>

    @Column({nullable: false})
    value!: number

    @Column({nullable: false})
    result_type!: string

    @Column()
    app!: string

    @Column()
    instance!: string

    @Column()
    job!: string

    @ManyToOne(() => Incident, (incident) => incident.logs)
    incident!: Incident

    @ManyToOne(() => Project, (project) => project.logs)
    project!: Project
}