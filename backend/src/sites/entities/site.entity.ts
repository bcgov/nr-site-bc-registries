import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Site {
  @ApiProperty({
    example: "1",
    description: "The ID of the site",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  docid: number;
  @Column()
  site_id: number;
  @Column()
  siteid: number;
  @Column()
  catid: number;
  @Column()
  sequenceno: number;
  @Column()
  pin: number;
  @Column()
  pidno: number;
  @Column()
  eventid: number;
  @Column()
  associatedsiteid: number;
  @Column()
  participant_id: number;
  @Column()
  participantid: number;
  @Column()
  questionid: number;
  @Column()
  parentid: number;
  @Column()
  ownerid: number;
  @Column()
  contactid: number;
  @Column()
  completorid: number;
  @Column()
  aec_id: number;
  @Column()
  lat: number;
  @Column()
  latdeg: number;
  @Column()
  latmin: number;
  @Column()
  latsec: number;
  @Column()
  lon: number;
  @Column()
  londeg: number;
  @Column()
  lonmin: number;
  @Column()
  lonsec: number;
  @Column()
  regdate: Date;
  @Column()
  eventdate: Date;
  @Column()
  approval_date: Date;
  @Column()
  moddate: Date;
  @Column()
  tombdate: Date;
  @Column()
  effectivedate: Date;
  @Column()
  enddate: Date;
  @Column()
  datenoted: Date;
  @Column()
  date_completed: Date;
  @Column()
  expirydate: Date;
  @Column()
  datecompleted: Date;
  @Column()
  datereceived: Date;
  @Column()
  datelocalauthority: Date;
  @Column()
  dateregistrar: Date;
  @Column()
  datedecision: Date;
  @Column()
  dateentered: Date;
  @Column()
  submissiondate: Date;
  @Column()
  documentdate: Date;

  constructor(partial: Partial<Site>) {
    Object.assign(this, partial);
  }
}
