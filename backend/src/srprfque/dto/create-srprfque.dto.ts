import { PickType } from '@nestjs/swagger';
import { SrprfqueDto } from './srprfque.dto';

export class CreateSrprfqueDto extends PickType(SrprfqueDto, [] as const) {}
