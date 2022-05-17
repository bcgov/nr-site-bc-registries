import { PickType } from "@nestjs/swagger";
import { SrsourceDto } from "./srsource.dto";

export class CreateSrsourceDto extends PickType(SrsourceDto, [] as const) {}
