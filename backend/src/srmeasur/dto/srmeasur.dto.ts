import { ApiProperty } from "@nestjs/swagger";

export class SrmeasurDto {
  populationId: string; // a10;
  media: string; // a40;
  contaminant: string; // a50;
  numberOfSamples: string; // a4;
  lowValue: string; // ??
  highValue: string; // ??
  ninetyPctValue: string; // ??
  meanValue: string; // ??
  standardDeviation: string; // ??
}
