// Suspect Land Uses
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srland {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 100 })
  landUse: string; // a40; - some entries are larger than 40 characters
  @Column('varchar', { length: 255 })
  noteString: string; // a255;

  constructor(partial: Partial<Srland>) {
    Object.assign(this, partial);
  }
}
