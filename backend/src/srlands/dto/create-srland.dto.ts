import { PickType } from "@nestjs/swagger";
import { SrlandDto } from "./srland.dto";

export class CreateSrlandDto extends PickType(SrlandDto, [] as const) {}
