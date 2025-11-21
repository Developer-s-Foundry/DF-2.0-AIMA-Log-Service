import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("projects")
export default class ProjectModel {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({unique: true})
  base_url!: string;

  @Column({unique: true})
  prometheus_metric_url!: string;

  @Column()
  team_id!: number;

  @Column()
  owner_id!: number;
}