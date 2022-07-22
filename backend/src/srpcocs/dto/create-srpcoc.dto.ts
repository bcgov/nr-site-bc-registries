import { PickType } from '@nestjs/swagger';
import { SrpcocDto } from './srpcoc.dto';

export class CreateSrpcocDto extends PickType(SrpcocDto, [] as const) {}
