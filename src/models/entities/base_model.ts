
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class BaseModel {
    @PrimaryGeneratedColumn()
    id!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    update_at!: Date
    
} 