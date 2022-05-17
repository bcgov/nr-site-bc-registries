import { PickType } from "@nestjs/swagger";
import { SrprofilDto } from "./srprofil.dto";

export class CreateSrprofilDto extends PickType(SrprofilDto, [] as const) {}
