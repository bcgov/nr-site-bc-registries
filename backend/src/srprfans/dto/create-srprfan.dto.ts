import { PickType } from "@nestjs/swagger";
import { SrprfanDto } from "./srprfan.dto";

export class CreateSrprfanDto extends PickType(SrprfanDto, [] as const) {}
