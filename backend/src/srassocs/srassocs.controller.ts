import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SrassocsService } from "./srassocs.service";
import { CreateSrassocDto } from "./dto/create-srassoc.dto";
import { UpdateSrassocDto } from "./dto/update-srassoc.dto";

@ApiTags("srassocs")
@Controller("srassocs")
export class SrassocsController {
  constructor(private readonly srassocsService: SrassocsService) {}

  @Post()
  create(@Body() createSrassocDto: CreateSrassocDto) {
    return this.srassocsService.create(createSrassocDto);
  }

  @Get()
  findAll() {
    return this.srassocsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srassocsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrassocDto: UpdateSrassocDto) {
    return this.srassocsService.update(+id, updateSrassocDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srassocsService.remove(+id);
  }
}
