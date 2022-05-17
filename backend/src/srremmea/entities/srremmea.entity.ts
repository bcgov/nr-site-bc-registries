// AEC Remediation Measures
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srremmea {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  planId: string; // a10;
  @Column("varchar", { length: 40 })
  measureString: string; // a40;

  constructor(partial: Partial<Srremmea>) {
    Object.assign(this, partial);
  }
}
