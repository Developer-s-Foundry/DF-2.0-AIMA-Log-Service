import { Entity, Column, ManyToOne, OneToMany,  } from "typeorm";
import { BaseModel } from './base_model';
import { Incident } from './incident';
import { Exclude } from 'class-transformer';
import { Log } from "./log";



@Entity()
export class Project extends BaseModel{

    @Column({nullable: false})
    project_id!:  string

    @OneToMany(() => Log, (logs) => logs.project)
    logs: Log[]
}