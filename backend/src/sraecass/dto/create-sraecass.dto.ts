import { PickType } from '@nestjs/swagger';
import { SraecassDto } from './sraecass.dto';

export class CreateSraecassDto extends PickType(SraecassDto, [] as const) {}
