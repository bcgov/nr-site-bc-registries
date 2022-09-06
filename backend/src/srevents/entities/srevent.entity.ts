// Notations
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srevent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 10 })
  eventId: string; // a10;
  @Column('varchar', { length: 500 })
  eventType: string; // a80;
  @Column('varchar', { length: 500 })
  eventClass: string; // a80;
  @Column('varchar', { length: 10 })
  eventDate: string; // a10;
  @Column('varchar', { length: 10 })
  approvedDate: string; // a10;
  @Column('varchar', { length: 500 })
  ministryContact: string; // a150;
  @Column('varchar', { length: 1000 })
  noteString: string; // a255;
  @Column('varchar', { length: 2000 })
  requiredAction: string; // a2000;

  constructor(partial: Partial<Srevent>) {
    Object.assign(this, partial);
  }
}
