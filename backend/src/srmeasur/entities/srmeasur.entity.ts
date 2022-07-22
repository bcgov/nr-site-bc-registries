// Measurements
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srmeasur {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  populationId: string; // a10;
  @Column('varchar', { length: 40 })
  media: string; // a40;
  @Column('varchar', { length: 50 })
  contaminant: string; // a50;
  @Column('varchar', { length: 4 })
  numberOfSamples: string; // a4;
  @Column('varchar')
  lowValue: string; // ??
  @Column('varchar')
  highValue: string; // ??
  @Column('varchar')
  ninetyPctValue: string; // ??
  @Column('varchar')
  meanValue: string; // ??
  @Column('varchar')
  standardDeviation: string; // ??

  constructor(partial: Partial<Srmeasur>) {
    Object.assign(this, partial);
  }
}
