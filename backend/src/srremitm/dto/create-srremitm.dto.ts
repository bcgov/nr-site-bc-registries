import { PickType } from "@nestjs/swagger";
import { SrremitmDto } from "./srremitm.dto";

export class CreateSrremitmDto extends PickType(SrremitmDto, [] as const) {}
