// Site Profile Land Use
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srprfuse {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  dateCompleted: string; // a10;
  @Column("varchar", { length: 6 })
  landUseCode: string; // a6;
  @Column("varchar", { length: 40 })
  landUseString: string; // a40;

  constructor(partial: Partial<Srprfuse>) {
    Object.assign(this, partial);
  }
}
