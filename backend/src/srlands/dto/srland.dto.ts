import { ApiProperty } from '@nestjs/swagger';

export class SrlandDto {
  siteId: string; // a10;
  landUse: string; // a40;
  noteString: string; // a255;
}
