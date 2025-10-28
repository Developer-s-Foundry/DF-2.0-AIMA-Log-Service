import { Column, Entity, OneToMany } from "typeorm"
import { BaseModel } from "./base_model"
import { SeverityLevel } from "../../common/types/variable_types"
import { Log } from "./log"


@Entity('incidence')
export class Incident extends BaseModel{
    @Column({type: 'enum', enum: SeverityLevel})
    severity!: SeverityLevel 
    
    @Column()
    ocurrence!: number 

    @OneToMany(() => Log, (log) => log.incident)
    logs: Log[]
}