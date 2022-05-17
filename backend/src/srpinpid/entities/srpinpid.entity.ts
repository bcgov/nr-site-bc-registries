// Pin/Pid/Crown Lands
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srpinpid {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 9 })
  pin: string; // a9;
  @Column("varchar", { length: 9 })
  pid: string; // a9;
  @Column("varchar", { length: 7 })
  crownLandsFileNumber: string; // a7;
  @Column("varchar", { length: 255 })
  legalDescription: string; // a255;
  @Column("varchar", { length: 10 })
  dateNoted: string; // a10;

  constructor(partial: Partial<Srpinpid>) {
    Object.assign(this, partial);
  }
}
