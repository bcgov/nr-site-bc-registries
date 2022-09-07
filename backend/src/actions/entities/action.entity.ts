import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('boolean')
  updating: boolean;
  @Column('boolean')
  hasData: boolean;

  constructor(partial: Partial<Action>) {
    Object.assign(this, partial);
  }
}
