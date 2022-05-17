import { PickType } from "@nestjs/swagger";
import { SrassocDto } from "./srassoc.dto";

export class CreateSrassocDto extends PickType(SrassocDto, [] as const) {}
