// Document Participants
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srdocpar {
  @PrimaryColumn("varchar", { length: 10 })
  docId // a10;
  @Column("varchar", { length: 150 })
  nameString // a150;
  @Column("varchar", { length: 40 })
  roleString // a40;

  constructor(partial: Partial<Srdocpar>) {
    Object.assign(this, partial);
  }
}
