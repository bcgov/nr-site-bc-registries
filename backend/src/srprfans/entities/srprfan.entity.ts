// Site Profile Answers
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Srprfan {
  @PrimaryColumn("varchar", { length: 10 })
  siteId: string; // a10;
  @Column("varchar", { length: 10 })
  questionId: string; // a10;
  @Column("varchar", { length: 10 })
  dateCompleted: string; // a10;
  @Column("varchar", { length: 3 })
  answer: string; // a3;

  constructor(partial: Partial<Srprfan>) {
    Object.assign(this, partial);
  }
}
