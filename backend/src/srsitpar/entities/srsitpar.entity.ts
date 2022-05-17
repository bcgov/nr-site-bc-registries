// Site Participants
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srsitpar {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  participantId: string; // a10;
  @Column("varchar", { length: 150 })
  nameString: string; // a150;
  @Column("varchar", { length: 10 })
  effectiveDate: string; // a10;
  @Column("varchar", { length: 10 })
  endDate: string; // a10;
  @Column("varchar", { length: 255 })
  noteString: string; // a255;
  @Column("varchar", { length: 12 })
  participantType: string; // a12;

  constructor(partial: Partial<Srsitpar>) {
    Object.assign(this, partial);
  }
}
