// Document Participants
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srdocpar {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  docId: string; // a10;
  @Column('varchar', { length: 500 })
  nameString: string; // a150;
  @Column('varchar', { length: 200 })
  roleString: string; // a40;

  constructor(partial: Partial<Srdocpar>) {
    Object.assign(this, partial);
  }
}
