// Notation Participants
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srevpart {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  eventId: string; // a10;
  @Column('varchar', { length: 500 })
  nameString: string; // a150;
  @Column('varchar', { length: 500 })
  roleString: string; // a40;

  constructor(partial: Partial<Srevpart>) {
    Object.assign(this, partial);
  }
}
