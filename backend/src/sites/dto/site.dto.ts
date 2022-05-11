import { ApiProperty } from "@nestjs/swagger";

export class SiteDto {
  @ApiProperty({
    description: "The ID of the site",
  })
  id: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  docid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  site_id: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  siteid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  catid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  sequenceno: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  pin: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  pidno: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  eventid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  associatedsiteid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  participant_id: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  participantid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  questionid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  parentid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  ownerid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  contactid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  completeorid: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  aec_id: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  lat: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  latdeg: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  latmin: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  latsec: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  lon: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  londeg: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  lonmin: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  lonsec: number;

  @ApiProperty({
    description: "",
    default: "",
  })
  regdate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  eventdate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  approval_date: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  moddate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  tombdate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  effectivedate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  enddate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  datenoted: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  date_completed: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  expirydate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  datecompleted: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  datereceived: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  datelocalauthority: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  dateregistrar: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  datedecision: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  dateentered: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  submissiondate: Date;

  @ApiProperty({
    description: "",
    default: "",
  })
  documentdate: Date;
}
