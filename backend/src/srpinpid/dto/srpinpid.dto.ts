import { ApiProperty } from '@nestjs/swagger';

export class SrpinpidDto {
  siteId: string; // a10;
  pin: string; // a9;
  pid: string; // a9;
  crownLandsFileNumber: string; // a7;
  legalDescription: string; // a255;
  dateNoted: string; // a10;
}
