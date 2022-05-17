import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srapproa {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  planId: string; // a10;
  @Column("varchar", { length: 10 })
  aecId: string; // a10;
  @Column("varchar", { length: 10 })
  mediaId: string; // a10;
  @Column("varchar", { length: 10 })
  pcocId: string; // a10;
  @Column("varchar", { length: 1 })
  selected: string; // a1; 'Y' or blank

  constructor(partial: Partial<Srapproa>) {
    Object.assign(this, partial);
  }
}
