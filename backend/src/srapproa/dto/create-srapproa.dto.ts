import { PickType } from '@nestjs/swagger';
import { SrapproaDto } from './srapproa.dto';

export class CreateSrapproaDto extends PickType(SrapproaDto, [] as const) {}
