import { PickType } from '@nestjs/swagger';
import { SrparrolDto } from './srparrol.dto';

export class CreateSrparrolDto extends PickType(SrparrolDto, [] as const) {}
