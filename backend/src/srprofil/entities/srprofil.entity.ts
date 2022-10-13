// Site Profiles
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srprofil {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string;
  @Column('varchar', { length: 10 })
  dateCompleted: string;
  @Column('varchar', { length: 10 })
  ownerParticipantId: string; // *always 0
  @Column('varchar', { length: 10 })
  contactParticipantId: string; // *always 0
  @Column('varchar', { length: 10 })
  completorParticipantId: string; // *always 0
  @Column('varchar', { length: 10 })
  dateReceived: string;
  @Column('varchar', { length: 10 })
  dateLocalAuthority: string;
  @Column('varchar', { length: 10 })
  dateRegistrar: string;
  @Column('varchar', { length: 10 })
  dateDecision: string;
  @Column('varchar', { length: 10 })
  dateEntered: string;
  @Column('varchar', { length: 2000 })
  decisionText: string;
  @Column('varchar', { length: 2000 })
  commentString: string; // a2000;
  @Column('varchar', { length: 2000 })
  plannedActivityComment: string;
  @Column('varchar', { length: 2000 })
  siteDisclosureComment: string;
  @Column('varchar', { length: 2000 })
  govDocumentsComment: string;
  @Column('varchar', { length: 100 })
  localAuthEmail: string;

  constructor(partial: Partial<Srprofil>) {
    Object.assign(this, partial);
  }
}
