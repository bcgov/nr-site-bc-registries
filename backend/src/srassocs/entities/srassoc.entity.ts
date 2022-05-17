// Associations
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srassoc {
  @PrimaryColumn("varchar", { length: 10 })
  siteId // a10;
  @Column("varchar", { length: 10 })
  associatedSiteId // a10;
  @Column("varchar", { length: 10 })
  effectDate // a10;
  @Column("varchar", { length: 255 })
  noteString // a255;

  constructor(partial: Partial<Srassoc>) {
    Object.assign(this, partial);
  }
}
