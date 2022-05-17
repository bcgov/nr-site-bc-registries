import { PickType } from "@nestjs/swagger";
import { SrmeapopDto } from "./srmeapop.dto";

export class CreateSrmeapopDto extends PickType(SrmeapopDto, [] as const) {}
