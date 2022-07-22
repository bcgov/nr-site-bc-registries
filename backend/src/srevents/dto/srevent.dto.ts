import { ApiProperty } from '@nestjs/swagger';

export class SreventDto {
  siteId: string; // // a10;
  eventId: string; // a10;
  eventType: string; // a80;
  eventClass: string; // a80;
  eventDate: string; // a10;
  ministryContact: string; // a150;
  noteString: string; // a255;
  requiredAction: string; // a2000;
}
