import { Entity, Column, OneToMany} from "typeorm";
import { BaseModel } from "./base_model";
import { Log } from "./log";



@Entity('device')
export class Device extends BaseModel{

    @Column()
    host_machine!: string
    
    @Column()
    environment!: string
    
    @Column()
    region: string

    @OneToMany(() => Log, (log) => log.device)
    log!: Log    
} 