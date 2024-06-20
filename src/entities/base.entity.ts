import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn()
  created_date: Date;
}