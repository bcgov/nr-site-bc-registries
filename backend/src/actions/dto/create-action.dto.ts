import { PickType } from '@nestjs/swagger';
import { ActionDto } from './action.dto';

export class CreateActionDto extends PickType(ActionDto, [] as const) {}
