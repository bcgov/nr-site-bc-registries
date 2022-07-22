import { PickType } from '@nestjs/swagger';
import { SrremedDto } from './srremed.dto';

export class CreateSrremedDto extends PickType(SrremedDto, [] as const) {}
