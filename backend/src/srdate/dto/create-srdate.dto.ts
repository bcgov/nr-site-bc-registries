import { PickType } from '@nestjs/swagger';
import { SrdateDto } from './srdate.dto';

export class CreateSrdateDto extends PickType(SrdateDto, [] as const) {}
