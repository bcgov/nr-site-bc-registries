// Site Participant Roles
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srparrol {
  @PrimaryColumn("varchar", { length: 10 })
  participantId: string; // a10;
  @Column("varchar", { length: 40 })
  roleString: string; // a40;

  constructor(partial: Partial<Srparrol>) {
    Object.assign(this, partial);
  }
}
