import { ApiProperty } from '@nestjs/swagger';

export class SrmeapopDto {
  siteId: string; // a10;
  docId: string; // a10;
  populationId: string; // a10;
  populationName: string; // a80;
  measurementDate: string; // a10;
  associatedAecId: string; // a40;
}
