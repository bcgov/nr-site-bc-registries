import { PickType } from "@nestjs/swagger";
import { SrmediaDto } from "./srmedia.dto";

export class CreateSrmediaDto extends PickType(SrmediaDto, [] as const) {}
