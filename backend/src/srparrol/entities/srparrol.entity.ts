// Site Participant Roles
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srparrol {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  participantId: string; // a10;
  @Column('varchar', { length: 40 })
  roleString: string; // a40;

  constructor(partial: Partial<Srparrol>) {
    Object.assign(this, partial);
  }
}
