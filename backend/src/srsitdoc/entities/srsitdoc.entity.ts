// Documents
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srsitdoc {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 10 })
  docId: string; // a10;
  @Column('varchar', { length: 150 })
  titleString: string; // a150;
  @Column('varchar', { length: 10 })
  submissionDate: string; // a10;
  @Column('varchar', { length: 10 })
  documentDate: string; // a10;
  @Column('varchar', { length: 255 })
  noteString: string; // a255;

  constructor(partial: Partial<Srsitdoc>) {
    Object.assign(this, partial);
  }
}
