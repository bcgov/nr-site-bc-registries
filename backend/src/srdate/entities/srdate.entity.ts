import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srdate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 10 })
  downloaddate: string;

  constructor(partial: Partial<Srdate>) {
    Object.assign(this, partial);
  }
}
