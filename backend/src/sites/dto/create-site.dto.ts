import { PickType } from '@nestjs/swagger';
import { SiteDto } from './site.dto';

export class CreateSiteDto extends PickType(SiteDto, [] as const) {}
