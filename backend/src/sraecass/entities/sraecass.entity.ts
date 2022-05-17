// AEC Assessments
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Sraecass {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; //a10;
  @Column("varchar", { length: 10 })
  aecId: string; //a10;
  @Column("varchar", { length: 10 })
  assessmentDate: string; //a10;
  @Column("varchar", { length: 255 })
  location: string; //a255;
  @Column("varchar", { length: 10 })
  waterFlow: string; //a10;
  @Column("varchar", { length: 1 })
  monitoringWells: string; //a1; 'Y' or blank
  @Column("varchar", { length: 1 })
  dnapl: string; //a1; 'Y' or blank
  @Column("varchar", { length: 1 })
  lnapl: string; //a1; 'Y' or blank
  @Column("varchar", { length: 8 })
  area: string; //a8;
  @Column("varchar", { length: 4 })
  migrationPotential: string; //a4;

  constructor(partial: Partial<Sraecass>) {
    Object.assign(this, partial);
  }
}
