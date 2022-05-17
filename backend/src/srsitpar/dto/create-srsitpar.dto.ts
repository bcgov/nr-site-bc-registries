import { PickType } from "@nestjs/swagger";
import { SrsitparDto } from "./srsitpar.dto";

export class CreateSrsitparDto extends PickType(SrsitparDto, [] as const) {}
