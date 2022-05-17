import { PickType } from "@nestjs/swagger";
import { SrevpartDto } from "./srevpart.dto";

export class CreateSrevpartDto extends PickType(SrevpartDto, [] as const) {}
