// AEC Remediation Plans
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srremed {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  planId: string; // a10;
  @Column("varchar", { length: 10 })
  planDate: string; // a10;
  @Column("varchar", { length: 10 })
  approach: string; // a10;
  @Column("varchar", { length: 40 })
  siteUse: string; // a40;
  @Column("varchar", { length: 100 })
  criteria: string; // a100;
  @Column("varchar", { length: 255 })
  noteString: string; // a255;

  constructor(partial: Partial<Srremed>) {
    Object.assign(this, partial);
  }
}
