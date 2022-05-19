import { PickType } from '@nestjs/swagger';
import { SrmeasurDto } from './srmeasur.dto';

export class CreateSrmeasurDto extends PickType(SrmeasurDto, [] as const) {}
