// AEC Assessment Medias
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Srmedia {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 10 })
  siteId: string; // a10;
  @Column('varchar', { length: 10 })
  aecId: string; // a10;
  @Column('varchar', { length: 10 })
  mediaId: string; // a10;
  @Column('varchar', { length: 40 })
  mediaString: string; // a40;
  @Column('varchar', { length: 255 })
  noteString: string; // a255;

  constructor(partial: Partial<Srmedia>) {
    Object.assign(this, partial);
  }
}
