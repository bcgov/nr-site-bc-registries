// Document Participants
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srdocpar {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 10 })
  docId: string; // a10;
  @Column("varchar", { length: 150 })
  nameString: string; // a150;
  @Column("varchar", { length: 40 })
  roleString: string; // a40;

  constructor(partial: Partial<Srdocpar>) {
    Object.assign(this, partial);
  }
}
