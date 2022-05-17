// Site Profile Categories
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srprfcat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 10 })
  categoryId: string; // a10;
  @Column("varchar", { length: 10 })
  sequenceNumber: string; // a10;
  @Column("varchar", { length: 10 })
  effectiveDate: string; // a10;
  @Column("varchar", { length: 10 })
  expiryDate: string; // a10;
  @Column("varchar")
  questionType: string; // a1; - not actually 1 character
  @Column("varchar", { length: 200 })
  categoryDescription: string; // a200;

  constructor(partial: Partial<Srprfcat>) {
    Object.assign(this, partial);
  }
}
