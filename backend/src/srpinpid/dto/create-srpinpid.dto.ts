import { PickType } from '@nestjs/swagger';
import { SrpinpidDto } from './srpinpid.dto';

export class CreateSrpinpidDto extends PickType(SrpinpidDto, [] as const) {}
