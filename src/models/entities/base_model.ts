
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";



@Entity()
export class BaseModel {
    @Exclude()
    @PrimaryGeneratedColumn()
    id!: string

    @Exclude()
    @CreateDateColumn()
    created_at!: Date

    @Exclude()
    @UpdateDateColumn()
    update_at!: Date
    
} 