import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srdate {
  @PrimaryColumn("varchar", { length: 10 })
  downloaddate: string;

  constructor(partial: Partial<Srdate>) {
    Object.assign(this, partial);
  }
}
