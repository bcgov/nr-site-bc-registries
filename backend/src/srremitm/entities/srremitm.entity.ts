// AEC Remediation Items
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srremitm {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  planId: string; // a10;
  @Column("varchar", { length: 10 })
  approach: string; // a10;
  @Column("varchar", { length: 50 })
  contaminant: string; // a50;
  @Column("varchar", { length: 80 })
  activityString: string; // a80;
  @Column("varchar")
  targetLevel: string; // ??
  @Column("varchar", { length: 10 })
  units: string; // a10;
  @Column("varchar", { length: 40 })
  compound: string; // a40;
  @Column("varchar", { length: 40 })
  riskObjective: string; // a40;
  @Column("varchar", { length: 80 })
  riskAssessmentActivity: string; // a80;
  @Column("varchar")
  riskCalculated: string; // ??
  @Column("varchar")
  riskRemediated: string; // ??
  @Column("varchar", { length: 40 })
  hazardObjective: string; // a40;
  @Column("varchar")
  hazardCalculated: string; // ??
  @Column("varchar")
  hazardRemediated: string; // ??
  @Column("varchar", { length: 80 })
  riskAssessmentActivity: string; // a80;

  constructor(partial: Partial<Srremitm>) {
    Object.assign(this, partial);
  }
}
