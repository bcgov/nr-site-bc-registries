import { PickType } from '@nestjs/swagger';
import { SrdocparDto } from './srdocpar.dto';

export class CreateSrdocparDto extends PickType(SrdocparDto, [] as const) {}
