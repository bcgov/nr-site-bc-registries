import { PickType } from '@nestjs/swagger';
import { SrprfcatDto } from './srprfcat.dto';

export class CreateSrprfcatDto extends PickType(SrprfcatDto, [] as const) {}
