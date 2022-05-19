// Assessment Sources
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srsource {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 10 })
  aecId: string; // a10;
  @Column('varchar', { length: 80 })
  sourceString: string; // a80;

  constructor(partial: Partial<Srsource>) {
    Object.assign(this, partial);
  }
}
