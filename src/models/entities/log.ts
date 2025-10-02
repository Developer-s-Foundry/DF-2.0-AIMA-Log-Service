import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    timestamp!: Date

    @Column()
    service_name!: string

    @Column()
    message!: Text
    
    @Column()
    context!: JSON

    @Column()
    host!: string

    @CreateDateColumn()
    created_at!: Date
}