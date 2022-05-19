import { PickType } from '@nestjs/swagger';
import { SrsitdocDto } from './srsitdoc.dto';

export class CreateSrsitdocDto extends PickType(SrsitdocDto, [] as const) {}
