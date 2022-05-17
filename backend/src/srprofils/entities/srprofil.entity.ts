// Site Profiles
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srprofil {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  dateCompleted: string; // a10;
  @Column("varchar", { length: 10 })
  ownerParticipantId: string; // a10; *always 0
  @Column("varchar", { length: 10 })
  contactParticipantId: string; // a10; *always 0
  @Column("varchar", { length: 10 })
  completorParticipantId: string; // a10; *always 0
  @Column("varchar", { length: 10 })
  dateLocalAuthority: string; // a10;
  @Column("varchar", { length: 10 })
  dateRegistrar: string; // a10;
  @Column("varchar", { length: 10 })
  dateDecision: string; // a10;
  @Column("varchar", { length: 2000 })
  comments: string; // a2000;

  constructor(partial: Partial<Srprofil>) {
    Object.assign(this, partial);
  }
}
