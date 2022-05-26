// Associations
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srassoc {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 10 })
  associatedSiteId: string; // a10;
  @Column('varchar', { length: 10 })
  effectDate: string; // a10;
  @Column('varchar', { length: 255 })
  noteString: string; // a255;

  constructor(partial: Partial<Srassoc>) {
    Object.assign(this, partial);
  }
}
