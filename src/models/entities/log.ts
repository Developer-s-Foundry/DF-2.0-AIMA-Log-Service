import { Entity, Column, ManyToOne,  } from "typeorm";
import { BaseModel } from './base_model';
import { Incident } from './incident';
import { Project } from "./project";



@Entity()
export class Log extends BaseModel{

    @Column()
    metric_name!:  string

    @Column()
    timestamp!: Date

    // @Column({ type: 'jsonb', default: () => "'{}'" })
    // labels!: Record<string, any>

    @Column({nullable: false})
    value!: number

    @Column({nullable: false})
    result_type!: string

    @Column()
    app_name!: string

    @Column()
    instance!: string

    @Column()
    job!: string

    @ManyToOne(() => Incident, (incident) => incident.logs)
    incident!: Incident

    @ManyToOne(() => Project, (project) => project.logs)
    project!: Project
}