import { ApiProperty } from '@nestjs/swagger';

export class SrprfanDto {
  siteId: string; // a10;
  questionId: string; // a10;
  dateCompleted: string; // a10;
  answer: string; // a3;
}
