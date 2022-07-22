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
  @Column('varchar', { length: 400 })
  questionDescription: string; // a200; - some entries are larger than 200 characters

  constructor(partial: Partial<Srprfque>) {
    Object.assign(this, partial);
  }
}
