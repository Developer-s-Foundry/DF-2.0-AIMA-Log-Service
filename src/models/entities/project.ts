import { Entity, OneToMany, Column, UpdateDateColumn, PrimaryColumn, CreateDateColumn} from "typeorm";
import { BaseModel } from './base_model';
import { Metrics } from "./metric";


@Entity()
export class Project {

    @PrimaryColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    base_url: string

    @Column()
    prometheus_metric_url!: string

    @Column()
    team_id!: number

    @Column()
    owner_id: number

    @UpdateDateColumn({type: 'timestamptz'})
    updated_at!: Date

    @CreateDateColumn({type: 'timestamptz'})
    created_at! : Date

    @OneToMany(() => Metrics, (metric) => metric.project)
    metrics!: Metrics[]

}