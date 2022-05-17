// Measurement Populations
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srmeapop {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 10 })
  siteId; // a10;
  @Column("varchar", { length: 10 })
  docId; // a10;
  @Column("varchar", { length: 10 })
  populationId; // a10;
  @Column("varchar", { length: 80 })
  populationName; // a80;
  @Column("varchar", { length: 10 })
  measurementDate; // a10;
  @Column("varchar", { length: 40 })
  associatedAecId; // a40;

  constructor(partial: Partial<Srmeapop>) {
    Object.assign(this, partial);
  }
}
