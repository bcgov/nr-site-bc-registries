import { PickType } from "@nestjs/swagger";
import { SrprfuseDto } from "./srprfuse.dto";

export class CreateSrprfuseDto extends PickType(SrprfuseDto, [] as const) {}
