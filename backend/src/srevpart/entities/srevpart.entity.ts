// Notation Participants
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srevpart {
  @PrimaryColumn("varchar", { length: 10 })
  eventId: string; // a10;
  @Column("varchar", { length: 150 })
  nameString: string; // a150;
  @Column("varchar", { length: 40 })
  roleString: string; // a40;

  constructor(partial: Partial<Srevpart>) {
    Object.assign(this, partial);
  }
}
