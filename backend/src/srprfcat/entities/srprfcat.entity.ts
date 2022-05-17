// Site Profile Categories
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srprfcat {
  @PrimaryColumn("varchar", { length: 10 })
  categoryId: string; // a10;
  @Column("varchar", { length: 10 })
  sequenceNumber: string; // a10;
  @Column("varchar", { length: 10 })
  effectiveDate: string; // a10;
  @Column("varchar", { length: 10 })
  expiryDate: string; // a10;
  @Column("varchar", { length: 1 })
  questionType: string; // a1;
  @Column("varchar", { length: 200 })
  categoryDescription: string; // a200;

  constructor(partial: Partial<Srprfcat>) {
    Object.assign(this, partial);
  }
}
