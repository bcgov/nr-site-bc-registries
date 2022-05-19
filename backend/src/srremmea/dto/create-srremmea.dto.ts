import { PickType } from '@nestjs/swagger';
import { SrremmeaDto } from './srremmea.dto';

export class CreateSrremmeaDto extends PickType(SrremmeaDto, [] as const) {}
