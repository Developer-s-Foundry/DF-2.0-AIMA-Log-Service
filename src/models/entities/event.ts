import { Entity, OneToMany, Column} from "typeorm";
import { BaseModel } from './base_model';
import { Log } from "./log";


@Entity()
export class Event extends BaseModel{
    
    @Column()
    event_id!: string

    @OneToMany(() => Log, (logs) => logs.event)
    logs!: Log[]

}