import { PickType } from '@nestjs/swagger';
import { SreventDto } from './srevent.dto';

export class CreateSreventDto extends PickType(SreventDto, [] as const) {}
