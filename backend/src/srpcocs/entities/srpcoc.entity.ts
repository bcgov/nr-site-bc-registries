// AEC Assessment PCOCs
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srpcoc {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 10 })
  aecId: string; // a10;
  @Column('varchar', { length: 10 })
  mediaId: string; // a10;
  @Column('varchar', { length: 10 })
  pcocId: string; // a10;
  @Column('varchar', { length: 50 })
  contaminant: string; // a50;
  @Column('varchar', { length: 100 })
  criteria: string; // a100;
  @Column('varchar', { length: 6 })
  level: string; // a6;

  constructor(partial: Partial<Srpcoc>) {
    Object.assign(this, partial);
  }
}
