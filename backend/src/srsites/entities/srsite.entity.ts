// Site Detail/Tombstone Information
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srsite {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 40 })
  region: string; // a40;
  @Column('varchar', { length: 40 })
  status: string; // a40; 'PENDING' or valid status
  @Column('varchar', { length: 40 })
  commonName: string; // a40;
  @Column('varchar', { length: 50 })
  address_1: string; // a50;
  @Column('varchar', { length: 50, default: '' })
  address_2: string; // a50;
  @Column('varchar', { length: 50, default: '' })
  address_3: string; // a50;
  @Column('varchar', { length: 50, default: '' })
  address_4: string; // a50;
  @Column('varchar', { length: 30 })
  city: string; // a30;
  @Column('varchar', { length: 2 })
  provState: string; // a2;
  @Column('varchar', { length: 10 })
  postalCode: string; // a10;
  @Column('varchar', { length: 9 })
  lat: string; // a9;
  @Column('varchar', { length: 3 })
  latDeg: string; // a3;
  @Column('varchar', { length: 3 })
  latMin: string; // a3;
  @Column('varchar', { length: 3 })
  latSec: string; // a3;
  @Column('varchar', { length: 9 })
  lon: string; // a9;
  @Column('varchar', { length: 3 })
  lonDeg: string; // a3;
  @Column('varchar', { length: 3 })
  lonMin: string; // a3;
  @Column('varchar', { length: 3 })
  lonSec: string; // a3;
  @Column('varchar', { length: 40 })
  victoriaFileNumber: string; // a40;
  @Column('varchar', { length: 40 })
  regionalFileNumber: string; // a40;
  @Column('varchar', { length: 40 })
  classification: string; // a40;
  @Column('varchar', { length: 255 })
  locationDescription: string; // a255;
  @Column('varchar', { length: 10 })
  registeredDate: string; // a10;
  @Column('varchar', { length: 10 })
  modifiedDate: string; // a10;
  @Column('varchar', { length: 10 })
  detailRemovedDate: string; // a10;

  constructor(partial: Partial<Srsite>) {
    Object.assign(this, partial);
  }
}
