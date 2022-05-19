// Site Profile Questions
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srprfque {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  questionId: string; // a10;
  @Column('varchar', { length: 10 })
  sequenceNumber: string; // a10;
  @Column('varchar', { length: 10 })
  categoryId: string; // a10;
  @Column('varchar', { length: 10 })
  parentQuestionId: string; // a10;
  @Column('varchar', { length: 10 })
  effectiveDate: string; // a10;
  @Column('varchar', { length: 10 })
  expiryDate: string; // a10;
  @Column('varchar', { length: 200 })
  questionDescription: string; // a200;

  constructor(partial: Partial<Srprfque>) {
    Object.assign(this, partial);
  }
}
