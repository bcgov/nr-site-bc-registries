import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Srdate {
  @ApiProperty({
    example: "1",
    description: "The ID of the srdate",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  downloaddate: Date;

  constructor(partial: Partial<Srdate>) {
    Object.assign(this, partial);
  }
}
