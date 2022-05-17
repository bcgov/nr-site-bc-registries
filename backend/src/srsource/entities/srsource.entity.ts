// Assessment Sources
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srsource {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  aecId: string; // a10;
  @Column("varchar", { length: 80 })
  sourceString: string; // a80;

  constructor(partial: Partial<Srsource>) {
    Object.assign(this, partial);
  }
}
