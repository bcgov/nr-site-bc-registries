// Notations
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srevent {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  eventId: string; // a10;
  @Column("varchar", { length: 80 })
  eventType: string; // a80;
  @Column("varchar", { length: 80 })
  eventClass: string; // a80;
  @Column("varchar", { length: 10 })
  eventDate: string; // a10;
  @Column("varchar", { length: 150 })
  ministryContact: string; // a150;
  @Column("varchar", { length: 255 })
  noteString: string; // a255;
  @Column("varchar", { length: 2000 })
  requiredAction: string; // a2000;

  constructor(partial: Partial<Srevent>) {
    Object.assign(this, partial);
  }
}
