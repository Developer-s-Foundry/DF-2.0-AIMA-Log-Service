import { Column, Entity, OneToMany } from "typeorm"
import { BaseModel } from "./base_model"
import { ServiceStatus, SeverityLevel } from "../../common/config/types"
import { Log } from "./log"


@Entity('incidence')
export class Incident extends BaseModel{
    @Column({type: 'enum', enum: SeverityLevel})
    severity!: SeverityLevel 
    
    @Column()
    ocurrence!: number
    
    @Column()
    status!: ServiceStatus 

    @OneToMany(() => Log, (log) => log.incident)
    log: Log
}
