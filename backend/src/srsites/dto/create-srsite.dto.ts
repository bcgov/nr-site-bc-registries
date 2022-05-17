import { PickType } from "@nestjs/swagger";
import { SrsiteDto } from "./srsite.dto";

export class CreateSrsiteDto extends PickType(SrsiteDto, [] as const) {}
